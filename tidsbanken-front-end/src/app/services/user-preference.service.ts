import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  private apiUrl = 'http://your-backend-api-url/preferences'; // Create this API-endpoint

  constructor(private http: HttpClient) {}

  savePreferences(preferences: any): Observable<any> {
    return this.http.post(this.apiUrl, preferences);
  }
}
