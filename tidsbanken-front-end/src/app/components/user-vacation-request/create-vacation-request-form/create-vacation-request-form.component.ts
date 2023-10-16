import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { map } from 'rxjs/operators';
import { InvalidFormError } from 'src/app/errors/invalidFormError';
import { UserNotFoundError } from 'src/app/errors/userNotFoundError';
import { EmployeeId } from 'src/app/globals/employee';
import {
  getEnumValues,
  getVacationTypeKeyStringByValue,
} from 'src/app/globals/enum-converter';
import { BlockedPeriod, BlockedPeriodDTO } from 'src/app/models/blocked-period';
import { EmployeePostDTO } from 'src/app/models/user';
import {
  VacationRequestPostDTO,
  VacationType,
} from 'src/app/models/vacation-request';
import { BlockedPeriodService } from 'src/app/services/blocked-period.service';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-create-vacation-request-form',
  templateUrl: './create-vacation-request-form.component.html',
  styleUrls: ['./create-vacation-request-form.component.scss'],
})
export class CreateVacationRequestFormComponent implements OnInit {
  requestVacationForm: FormGroup;
  blockedPeriods: BlockedPeriod[] = [];

  vacationTypes: string[] = this.getVacationTypes();
  isBlockedPeriodsLoaded: boolean = false;

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
  }

  constructor(
    private fb: FormBuilder,
    private readonly blockedPeriodService: BlockedPeriodService,
    private readonly requestService: RequestService,
    private readonly keycloakService: KeycloakService,
    private readonly componentCommunicationService: ComponentCommunicationService
  ) {
    // Initializes the FormGroup with FormControl and validation
    this.requestVacationForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      vacationType: ['', Validators.required],
      notes: [''],
    });

    // Subscribe to selecting startdate so that all dates after the next blocked period are disabled.
    this.requestVacationForm
      .get('startDate')
      ?.valueChanges.subscribe((selectedStartDate) => {
        this.rangeFilter = (date: Date | null): boolean => {
          if (!date) {
            return false; // Return false for null dates (e.g., initial state)
          }

          // Disable all dates before the current date
          let yesterdayDate = new Date();
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          const isPastDate = date < yesterdayDate;
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

          let firstBlockedDate = null;
          console.log('...........................', date);
          if (this.blockedPeriods.length > 0) {
            for (let i = 0; i < this.blockedPeriods.length; i++) {
              const blockedPeriod = this.blockedPeriods[i];
              const startDate = new Date(blockedPeriod.startDate);
              startDate.setDate(startDate.getDate() - 1); // Has to compare with the day before

              console.log(
                'Checking blockperiods: ',
                i,
                ' startDate:',
                startDate
              );
              console.log('Current firstBlockedDate:', firstBlockedDate);
              console.log('selectedStartDate:', selectedStartDate);
              console.log(
                'blocked date bigger than selected date:',
                startDate > selectedStartDate
              );

              if (
                (firstBlockedDate === null && startDate > selectedStartDate) ||
                (firstBlockedDate !== null &&
                  startDate < firstBlockedDate &&
                  startDate > selectedStartDate)
              ) {
                firstBlockedDate = startDate;
                console.log('setting the first blocked date', firstBlockedDate);
              } else {
                firstBlockedDate = null;
              }
              console.log('');
            }
          }

          // Disable all dates after the first blocked date that occurrs after the selected first date
          let isAfterFirstBlockedDate: boolean = false;
          if (firstBlockedDate !== null) {
            isAfterFirstBlockedDate = date > firstBlockedDate;
            //console.log(date, "selected start date", selectedStartDate, "first blocked date", firstBlockedDate, "is after first blocked date", isAfterFirstBlockedDate)
          }
          return (
            !isPastDate &&
            !isAYearInFutureDate &&
            !isBlockedDate &&
            !isAfterFirstBlockedDate
          );
        };
      });
  }

  getVacationTypes() {
    const allVacationTypes: string[] = getEnumValues(VacationType);
    return allVacationTypes.slice(0, allVacationTypes.length - 1); // To remove the "MISSING" type
  }

  getBlockedPeriods() {
    try {
      // Get the logged in user to get its manager's id
      const userParsedToken =
        this.keycloakService.getKeycloakInstance().idTokenParsed;
      if (userParsedToken) {
        const newEmployee: EmployeePostDTO = {
          employeeId: userParsedToken['employee_id'],
          manager: userParsedToken['manager_id'],
          firstName: userParsedToken['given_name'],
          lastName: userParsedToken['family_name'],
          email: userParsedToken['email'],
          authRole: userParsedToken['auth_role'],
          role: userParsedToken['work_role'],
        };

        this.blockedPeriodService
          .getBlockedPeriods(newEmployee.manager)
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
    } catch (error) {
      if (
        error instanceof InvalidFormError ||
        error instanceof UserNotFoundError
      )
        console.error('Error occurred:', error.message);
      else console.error('Error occurred:', error);
    }
  }

  postVacationRequest() {
    try {
      if (!this.requestVacationForm.valid) {
        throw new InvalidFormError('Required field not valid');
      }

      // Get the userId
      const employeeIdInstance = new EmployeeId(this.keycloakService); // Pass the keycloakService instance to the constructor
      const employeeId = employeeIdInstance.getEmployeeId();

      // Format the dates
      const formattedDateModel = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      };
      const startDate = this.requestVacationForm.get('startDate')?.value;
      const endDate = this.requestVacationForm.get('endDate')?.value;
      const formattedStartDate = startDate.toLocaleDateString(
        'sv-SE',
        formattedDateModel
      );
      const formattedEndDate = endDate.toLocaleDateString(
        'sv-SE',
        formattedDateModel
      );

      // Get vacation type and format to a string
      const vacationType = getVacationTypeKeyStringByValue(
        this.requestVacationForm.get('vacationType')?.value
      );
      // If some unexpected error throw error
      if (
        getVacationTypeKeyStringByValue(
          this.requestVacationForm.get('vacationType')?.value
        ) === 'MISSING'
      ) {
        throw new Error();
      }

      // Create the new request
      const request: VacationRequestPostDTO = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        employeeId: employeeId,
        vacationType: vacationType,
        notes: this.requestVacationForm.get('notes')?.value,
      };

      console.log(request);

      // Post the new request to the database
      this.requestService.postRequest(request).subscribe(
        (response) => {
          console.log('Request created:', response);
          this.componentCommunicationService.triggerReRenderRequestHistory();
          this.requestVacationForm.reset;
        },
        (error) => {
          console.error('Error creating request:', error);
        }
      );
    } catch (error) {
      if (
        error instanceof InvalidFormError ||
        error instanceof UserNotFoundError
      )
        console.error('Error occurred:', error.message);
      else console.error('Error occurred:', error);
    }
  }
}
