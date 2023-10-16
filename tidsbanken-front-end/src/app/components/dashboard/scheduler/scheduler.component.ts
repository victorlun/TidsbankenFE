import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DayPilot } from 'daypilot-pro-angular';
import { map } from 'rxjs/operators';
import { NEUTRAL_COLOR } from 'src/app/globals/color-constants';
import { getVacationTypeEnumKeyByKeyString } from 'src/app/globals/enum-converter';
import { MONTH_NAMES } from 'src/app/globals/month-names';
import { EmployeeDTO, SchedulerResource } from 'src/app/models/user';
import { VacationRequestDTO } from 'src/app/models/vacation-request';
import { EmployeeService } from 'src/app/services/employee.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: 'scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {
  MONTH_NAMES: string[] = MONTH_NAMES; // To be able to use in template
  currentDate: DayPilot.Date = DayPilot.Date.today();
  currentMonth: number = this.currentDate.getMonth();
  currentYear: number = this.currentDate.getYear();

  // Data
  employees: SchedulerResource[] = [];
  vacations: DayPilot.EventData[] = [];

  // Scheduler configuration
  config: DayPilot.SchedulerConfig = {
    locale: 'en-gb',
    rowHeaderColumns: [{ text: 'Name', display: 'name', sort: 'name' }],
    timeHeaders: [{ groupBy: 'None' }, { groupBy: 'Day', format: 'd' }],
    scale: 'Day',
    days: this.currentDate.daysInMonth(),
    startDate: this.currentDate.firstDayOfMonth(),
    timeRangeSelectedHandling: 'Enabled',
    theme: 'employeesscheduler',
    resources: [
      //default just to get the rows of the calendar
      { name: '', id: 'R1' },
      { name: '', id: 'R2' },
      { name: '', id: 'R3' },
      { name: '', id: 'R4' },
      { name: '', id: 'R5' },
      { name: '', id: 'R6' },
      { name: '', id: 'R7' },
      { name: '', id: 'R8' },
      { name: '', id: 'R9' },
      { name: '', id: 'R10' },
    ],
  };

  constructor(
    private readonly employeeService: EmployeeService,
    private readonly requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getVacations();
  }

  // Fetch request to get all the employees and add them to the scheduler view
  getEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(
        map((response: EmployeeDTO[]) => {
          return response.map((employee) => ({
            name: `${employee.firstName} ${employee.lastName}`,
            id: employee.employeeId.toString(),
          }));
        })
      )
      .subscribe({
        next: (schedulerResources: SchedulerResource[]) => {
          this.employees = schedulerResources;
          this.config.resources = this.employees;
        },
        error: (error: HttpErrorResponse) => {
          console.log('An error occurred: ', error);
        },
        complete: () => {
          console.log('Execution has finished');
        },
      });
  }

  // Fetch request to get all vacations
  getVacations() {
    this.requestService
      .getApprovedRequests()
      .pipe(
        map((response: VacationRequestDTO[]) => {
          return response.map((vacation) => ({
            id: vacation.vacationRequestId,
            start: vacation.startDate,
            end: new Date(vacation.endDate).setDate(
              new Date(vacation.endDate).getDate() + 1
            ),
            resource: vacation.employeeId.toString(),
            text: getVacationTypeEnumKeyByKeyString(vacation.vacationType),
            backColor: NEUTRAL_COLOR,
            moveDisabled: true,
            barHidden: true,
            clickDisabled: false,
          }));
        })
      )
      .subscribe({
        next: (vacations: any[]) => {
          this.vacations = vacations;
        },
        error: (error: HttpErrorResponse) => {
          console.log('An error occurred: ', error);
        },
        complete: () => {
          console.log('Execution has finished');
        },
      });
  }

  switchMonth(shift: number): void {
    // Set new date
    this.currentDate = this.currentDate.addMonths(shift);
    this.currentMonth = this.currentDate.getMonth();
    // Testing
    console.log(this.currentMonth);
    console.log(MONTH_NAMES[this.currentMonth]);
    this.currentYear = this.currentDate.getYear();

    // Update Calendar
    this.config.days = this.currentDate.daysInMonth();
    this.config.startDate = this.currentDate.firstDayOfMonth();
  }
}
