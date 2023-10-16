import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, switchMap, take, catchError } from 'rxjs/operators';
import { of, forkJoin, Observable, throwError } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { UserNotFoundError } from 'src/app/errors/userNotFoundError';
import {
  ResponseDTO,
  VacationRequest,
  VacationRequestDTO,
  VacationRequestStatus,
  defaultVacationRequest,
} from 'src/app/models/vacation-request';
import { RequestService } from 'src/app/services/request.service';
import { ResponseService } from 'src/app/services/response.service';
import { getVacationTypeEnumKeyByKeyString } from 'src/app/globals/enum-converter';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';

@Component({
  selector: 'app-manage-vacation-requests',
  templateUrl: './manage-vacation-requests.page.html',
  styleUrls: ['./manage-vacation-requests.page.scss'],
})
export class ManageVacationRequestsPage implements OnInit {
  unhandledRequests: VacationRequest[] = [defaultVacationRequest];
  handledRequests: VacationRequest[] = [defaultVacationRequest];

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly requestService: RequestService,
    private readonly responseService: ResponseService,
    private readonly componentCommunicationService: ComponentCommunicationService
  ) {}

  ngOnInit(): void {
    this.getRequests();
    // // Subscribe to reRender$ observable to rerender a request is managed
    this.componentCommunicationService.reRender$ManageRequestsList.subscribe(
      () => {
        this.getRequests();
      }
    );
  }

  getRequests() {
    try {
      // Get the token
      const userParsedToken = this.keycloakService.getKeycloakInstance().idTokenParsed;

      if (userParsedToken) {
      //Extract the manager id  
        const managerId = userParsedToken['manager_id'];
      
      // Get requests by the logged in manager
      this.requestService
        .getRequestsByManager(managerId)
        .pipe(
          switchMap((requests: VacationRequestDTO[]) => {
            // Split the requests into two lists
            const unhandledRequests: Observable<VacationRequest>[] = [];
            const handledRequests: Observable<VacationRequest>[] = [];

            requests.forEach((request: VacationRequestDTO) => {
              // If the request has a response, fetch the response and add to handledRequests
              // otherwise create a request observable with the pending status and att to unhandlesRequests
              if (request.vacationResponseId !== null) {
                const request$ = this.responseService
                  .getResponseById(request.vacationResponseId)
                  .pipe(
                    take(1), // Ensure the inner observable completes after emitting one value
                    map((response: ResponseDTO) => ({
                      id: request.vacationRequestId,
                      employeeId: request.employeeId,
                      employeeName: `${request.firstName} ${request.lastName}`,
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
                handledRequests.push(request$);
              } else {
                unhandledRequests.push(
                  of({
                    id: request.vacationRequestId,
                    employeeId: request.employeeId,
                    employeeName: `${request.firstName} ${request.lastName}`,
                    startDate: request.startDate,
                    endDate: request.endDate,
                    vacationType: getVacationTypeEnumKeyByKeyString(
                      request.vacationType
                    ),
                    requestComment: request.notes || null,
                    status: VacationRequestStatus.PENDING,
                    responseComment: null,
                  })
                );
              }
            });

            // Check if there are any observables in the arrays before using forkJoin
            const unhandledRequests$ =
              unhandledRequests.length > 0
                ? forkJoin(unhandledRequests)
                : of([]);
            const handledRequests$ =
              handledRequests.length > 0 ? forkJoin(handledRequests) : of([]);

            return forkJoin([unhandledRequests$, handledRequests$]).pipe(
              catchError((error: any) => {
                console.error('Error in observable chain:', error);
                // Handle the error here if needed
                return throwError(error); // Re-throw the error to propagate it
              })
            );
          })
        )
        .subscribe({
          next: ([unhandledRequests, handledRequests]: [
            VacationRequest[],
            VacationRequest[]
          ]) => {
            console.log('Unhandled Requests:', unhandledRequests);
            console.log('Handled Requests:', handledRequests);
            // Sort both lists after the latest requests
            unhandledRequests.sort((a, b) => b.id - a.id);
            handledRequests.sort((a, b) => b.id - a.id);
            this.unhandledRequests = unhandledRequests;
            this.handledRequests = handledRequests;
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
      if (error instanceof UserNotFoundError)
        console.error('Error occurred:', error.message);
      else console.error('Error occurred:', error);
    }
  }
}
