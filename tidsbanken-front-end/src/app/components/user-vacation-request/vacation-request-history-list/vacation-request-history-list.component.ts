import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';
import {
  ResponseDTO,
  UserVacationRequest,
  VacationRequestDTO,
  VacationRequestStatus,
} from 'src/app/models/vacation-request';
import { RequestService } from 'src/app/services/request.service';
import { getVacationTypeEnumKeyByKeyString } from 'src/app/globals/enum-converter';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';
import { UserNotFoundError } from 'src/app/errors/userNotFoundError';
import { ResponseService } from 'src/app/services/response.service';
import { EmployeeId } from 'src/app/globals/employee';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-vacation-request-history-list',
  templateUrl: './vacation-request-history-list.component.html',
  styleUrls: ['./vacation-request-history-list.component.scss'],
})
export class VacationRequestHistoryListComponent implements OnInit {
  requests: UserVacationRequest[] = [];
  get isHistoryEmpty(): boolean {
    return this.requests.length < 1;
  }

  constructor(
    private readonly requestService: RequestService,
    private readonly componentCommunicationService: ComponentCommunicationService,
    private readonly keycloakService: KeycloakService,
    private readonly responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.getRequests();
    // Subscribe to reRender$ observable to rerender the component when posting a new requests
    this.componentCommunicationService.reRender$RequestHistory.subscribe(() => {
      this.getRequests();
    });
  }

  getRequests() {
    try {
      // Get the userId
      const employeeIdInstance = new EmployeeId(this.keycloakService); // Pass the keycloakService instance to the constructor
      const employeeId = employeeIdInstance.getEmployeeId();

      // Get the history of requests by logged in user
      this.requestService
        .getRequestsByEmployeeId(employeeId)
        .pipe(
          switchMap((requests: VacationRequestDTO[]) => {
            const requestsWithResponses: Observable<UserVacationRequest>[] =
              requests.map((request: VacationRequestDTO) => {
                // If the request has a response, fetch the response otherwise create a request observable with the pending status
                if (request.vacationResponseId !== null) {
                  return this.responseService
                    .getResponseById(request.vacationResponseId)
                    .pipe(
                      tap((response: ResponseDTO) =>
                        console.log('The response', response)
                      ),
                      map((response: ResponseDTO) => ({
                        id: request.vacationRequestId,
                        startDate: request.startDate,
                        endDate: request.endDate,
                        vacationType: getVacationTypeEnumKeyByKeyString(
                          request.vacationType
                        ),
                        requestComment: request.notes || null,
                        status:
                          response.response === 'APPROVED'
                            ? VacationRequestStatus.APPROVED
                            : VacationRequestStatus.DENIED,
                        responseComment: response.responseComment || null,
                      }))
                    );
                } else {
                  return of({
                    id: request.vacationRequestId,
                    startDate: request.startDate,
                    endDate: request.endDate,
                    vacationType: getVacationTypeEnumKeyByKeyString(
                      request.vacationType
                    ),
                    requestComment: request.notes || null,
                    status: VacationRequestStatus.PENDING,
                    responseComment: null,
                  });
                }
              });

            // return the stream of requests
            return forkJoin(requestsWithResponses);
          })
        )
        .subscribe({
          next: (requests: UserVacationRequest[]) => {
            // Sort after the latest request
            requests.sort((a, b) => b.id - a.id);
            // Set the list of requests
            this.requests = requests;
          },
          error: (error: HttpErrorResponse) => {
            console.log('An error occurred: ', error);
          },
          complete: () => {
            console.log('Execution has finished');
          },
        });
    } catch (error) {
      if (error instanceof UserNotFoundError)
        console.error('Error occurred:', error.message);
      else console.error('Error occurred:', error);
    }
  }
}
