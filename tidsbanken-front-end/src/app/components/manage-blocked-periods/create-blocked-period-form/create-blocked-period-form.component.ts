import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlockedPeriod, BlockedPeriodDTO } from 'src/app/models/blocked-period';
import { BlockedPeriodService } from 'src/app/services/blocked-period.service';

@Component({
  selector: 'app-create-blocked-period-form',
  templateUrl: './create-blocked-period-form.component.html',
  styleUrls: ['./create-blocked-period-form.component.scss'],
})
export class CreateBlockedPeriodFormComponent implements OnInit {
  createBlockedPeriodForm: FormGroup;
  blockedPeriods: BlockedPeriod[] = [];
  isBlockedPeriodsLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly blockedPeriodService: BlockedPeriodService,
    private readonly keycloakService: KeycloakService,
    private readonly http: HttpClient
  ) {
    this.createBlockedPeriodForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  // Filter function to disable specific date ranges
  rangeFilter = (date: Date | null): boolean => {
    if (!date) {
      return false; // Return false for null dates (e.g., initial state)
    }

    // Disable all dates before the current date
    let lastDayDate = new Date();
    lastDayDate.setDate(lastDayDate.getDate() - 1);
    const isPastDate = date < lastDayDate;
    // Disable all dates a year ahead
    let aYearForwardDate = new Date();
    aYearForwardDate.setFullYear(aYearForwardDate.getFullYear() + 1);
    const isAYearInFutureDate = date > aYearForwardDate;

    // Disable all dates within a blocked period
    const isBlockedDate = this.blockedPeriods.some((blockedPeriod) => {
      // To filter the startDate it has to be the day before
      let filteringStartDate = new Date(blockedPeriod.startDate);
      filteringStartDate.setDate(filteringStartDate.getDate() - 1);
      return date >= filteringStartDate && date <= blockedPeriod.endDate;
    });

    return !isPastDate && !isAYearInFutureDate && !isBlockedDate;
  };

  ngOnInit(): void {
    this.getBlockedPeriods();
    console.log(this.blockedPeriods);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  createBlockedPeriod() {
    if (this.createBlockedPeriodForm.valid) {
      const startDate = this.createBlockedPeriodForm.get('startDate')?.value;
      const endDate = this.createBlockedPeriodForm.get('endDate')?.value;

      const formattedStartDate = this.formatDate(new Date(startDate));
      const formattedEndDate = this.formatDate(new Date(endDate));

      this.checkForVacationsInPeriod(startDate, endDate).subscribe(
        (overlappingRequests) => {
          if (overlappingRequests.length > 0) {
            alert(
              'Warning: There are overlapping vacation requests within this period.'
            );
            return;
          }

          // Prompt the user for confirmation
          const userConfirmed = window.confirm(
            `Are you sure you want to create a blocked period between ${formattedStartDate} and ${formattedEndDate}?`
          );
          if (!userConfirmed) {
            return; // Exit the function if user clicked "Cancel"
          }

          const userParsedToken =
            this.keycloakService.getKeycloakInstance().idTokenParsed;
          let employeeId = 0;
          if (userParsedToken) {
            employeeId = userParsedToken['employeeId'];
          }

          const payload = {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            managerId: employeeId,
          };

          this.http
            .post(
              'https://tbanken.azurewebsites.net/api/v1/blocked-periods',
              payload
            )
            .subscribe(
              (response) => {
                console.log('Successfully created blocked period:', response);
                this.blockedPeriodService.refreshList();
              },
              (error) => {
                console.error('Error creating blocked period:', error);
              }
            );
        }
      );
    }
  }

  checkForVacationsInPeriod(startDate: Date, endDate: Date) {
    return this.http
      .get<any[]>('https://tbanken.azurewebsites.net/api/v1/requests')
      .pipe(
        map((response) => {
          return response.filter((request) => {
            const requestStartDate = new Date(request.startDate);
            const requestEndDate = new Date(request.endDate);
            return requestStartDate <= endDate && requestEndDate >= startDate;
          });
        }),
        catchError((error) => {
          console.error('Error fetching vacation requests:', error);
          return of([]);
        })
      );
  }

  getBlockedPeriods() {
    const userParsedToken =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    let employeeId = 0;
    if (userParsedToken) {
      employeeId = userParsedToken['employeeId'];
    }

    this.blockedPeriodService
      .getBlockedPeriods(employeeId)
      .pipe(
        map((response: BlockedPeriodDTO[]) => {
          return response.map((blockedPeriod) => ({
            startDate: new Date(blockedPeriod.startDate),
            endDate: new Date(blockedPeriod.endDate),
          }));
        })
      )
      .subscribe({
        next: (blockedPeriods: BlockedPeriod[]) => {
          this.blockedPeriods = blockedPeriods;
          console.log(blockedPeriods);
          this.isBlockedPeriodsLoaded = true;
        },
        error: (error: HttpErrorResponse) => {
          console.log('An error occurred: ', error);
        },
        complete: () => {
          console.log('Execution has finished');
        },
      });
  }
}
