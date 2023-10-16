import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO, ResponsePostDTO } from '../models/vacation-request';

@Injectable({
  providedIn: 'root',
})
export class ResponseService {
  constructor(private readonly http: HttpClient) {}

  public getResponseById(responseId: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(
      `https://tbanken.azurewebsites.net/api/v1/responses/${responseId}`
    );
  }

  // Get a response by it's ID
  public getResponseByIdScheduler(
    responseId: number
  ): Observable<ResponsePostDTO> {
    return this.http.get<ResponsePostDTO>(
      `https://tbanken.azurewebsites.net/api/v1/responses/${responseId}`
    );
  }

  // Posting response to a request identified by requestId as a property in the ResponsePostDTO
  public postResponse(response: ResponsePostDTO): Observable<any> {
    return this.http.post(
      `https://tbanken.azurewebsites.net/api/v1/responses`,
      response
    );
  }
}
