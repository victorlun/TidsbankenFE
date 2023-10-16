import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO, EmployeePostDTO } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly http: HttpClient) {}
  private readonly baseUrl =
    'https://tbanken.azurewebsites.net/api/v1/employees';

  public getEmployees(): Observable<EmployeeDTO[]> {
    return this.http.get<EmployeeDTO[]>(this.baseUrl);
  }

  public getUser(userId: number): Observable<EmployeeDTO> {
    return this.http.get<EmployeeDTO>(this.baseUrl + '/' + userId);
  }

  public createEmployee(
    employeeData: EmployeePostDTO
  ): Observable<EmployeePostDTO> {
    return this.http.post<EmployeePostDTO>(this.baseUrl, employeeData);
  }
}
