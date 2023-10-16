import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DayPilot } from 'daypilot-pro-angular';
import { RequestService } from 'src/app/services/request.service';
import { VacationRequestDTO } from 'src/app/models/vacation-request';
import { StatusColors } from 'src/app/globals/color-constants';
import { MONTH_NAMES } from 'src/app/globals/month-names';
import { KeycloakService } from 'keycloak-angular';
import { ResponseService } from 'src/app/services/response.service';
import { getVacationTypeEnumKeyByKeyString } from 'src/app/globals/enum-converter';

@Component({
  selector: 'app-personal-scheduler',
  templateUrl: './personal-scheduler.component.html',
  styleUrls: ['./personal-scheduler.component.scss'],
})
export class PersonalSchedulerComponent implements OnInit {
  MONTH_NAMES: string[] = MONTH_NAMES;
  currentDate: DayPilot.Date = DayPilot.Date.today();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getYear();
  events: any = [];

  // Calendar configuration
  config: any = {
    locale: 'en-gb',
    viewType: 'Month',
    showWeekend: true,
    startDate: this.currentDate,
    timeRangeSelectedHandling: 'Disabled',
    eventDeleteHandling: 'Disabled',
    eventMoveHandling: 'Disabled',
    eventResizeHandling: 'Disabled',
    eventClickHandling: 'Disabled',
    eventHoverHandling: 'Disabled',
    theme: 'monthcalendar',
  };

  vacationRequests: VacationRequestDTO[] | undefined;
  constructor(
    private cdr: ChangeDetectorRef,
    private readonly requestService: RequestService,
    private readonly responseService: ResponseService,
    private readonly keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.getRequests();
  }

  toggleDatePicker() {
    this.cdr.detectChanges(); // Force change detection
  }

  switchMonth(shift: number): void {
    // Set new date
    this.currentDate = this.currentDate.addMonths(shift);
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getYear();

    // Update Calendar
    this.config.startDate = this.currentDate;
  }

  getRequests() {
    // Get userId to fetch the employee's vacations
    const userParsedToken =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    let employeeId = 0;
    if (userParsedToken) {
      employeeId = userParsedToken['employeeId'];
    }

    this.requestService
      .getRequestsByEmployeeId(employeeId)
      .subscribe((requests) => {
        const validRequests = requests.filter(
          (request) => request.vacationResponseId !== null
        );
        // Fetch response for each valid request.
        validRequests.forEach((request) => {
          return this.responseService
            .getResponseByIdScheduler(request.vacationResponseId!)
            .subscribe((response) => {
              if (response.response !== 'DENIED') {
                const newEndDate = new Date(request.endDate);
                newEndDate.setDate(newEndDate.getDate() + 1);
                this.events.push({
                  id: request.vacationRequestId,
                  start: request.startDate,
                  end: newEndDate,
                  text: getVacationTypeEnumKeyByKeyString(request.vacationType),
                  backColor: StatusColors.APPROVED_COLOR,
                });
              }
            });
        });

        // For pending requests where vacationResponseId is null
        const pendingRequests = requests.filter(
          (request) => request.vacationResponseId === null
        );
        pendingRequests.forEach((request) => {
          const newEndDate = new Date(request.endDate);
          newEndDate.setDate(newEndDate.getDate() + 1);
          this.events.push({
            id: request.vacationRequestId,
            start: request.startDate,
            end: newEndDate,
            text: getVacationTypeEnumKeyByKeyString(request.vacationType),
            backColor: StatusColors.PENDING_COLOR,
          });
        });
      });
  }
}
