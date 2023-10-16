import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  VacationRequestDTO,
  VacationRequestPostDTO,
} from '../models/vacation-request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private readonly http: HttpClient) {}

  // Fetching all vacations that are approved
  public getApprovedRequests(): Observable<VacationRequestDTO[]> {
    return this.http.get<VacationRequestDTO[]>(
      'https://tbanken.azurewebsites.net/api/v1/requests'
    );
  }

  // Fetching requests by employee that are either unhandled or have gotten approved
  public getApprovedAndPendingRequests(
    userId: number
  ): Observable<VacationRequestDTO[]> {
    return this.http.get<VacationRequestDTO[]>('');
  }

  // Fetching user's requests by ID
  public getRequestsByEmployeeId(
    userId: number
  ): Observable<VacationRequestDTO[]> {
    return this.http.get<VacationRequestDTO[]>(
      `https://tbanken.azurewebsites.net/api/v1/requests/employee/${userId}`
    );
  }

  // Fetching all requests by employee
  public getRequestsByEmployee(
    userId: number
  ): Observable<VacationRequestDTO[]> {
    return this.http.get<VacationRequestDTO[]>(
      `https://tbanken.azurewebsites.net/api/v1/employees/manager/${userId}/unhandled`
    );
  }

  // Fetching all requests by manager
  public getRequestsByManager(
    managerId: number
  ): Observable<VacationRequestDTO[]> {
    return this.http.get<VacationRequestDTO[]>(
      `https://tbanken.azurewebsites.net/api/v1/requests/manager/${managerId}`
    );
  }

  public postRequest(request: VacationRequestPostDTO): Observable<any> {
    return this.http.post(
      'https://tbanken.azurewebsites.net/api/v1/requests',
      request
    );
  }
}
