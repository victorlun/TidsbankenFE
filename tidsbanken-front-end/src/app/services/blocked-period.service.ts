import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlockedPeriodDTO } from '../models/blocked-period';

@Injectable({
  providedIn: 'root',
})
export class BlockedPeriodService {
  constructor(private readonly http: HttpClient) {}

  public getBlockedPeriods(managerId: number): Observable<BlockedPeriodDTO[]> {
    return this.http.get<BlockedPeriodDTO[]>(
      `https://tbanken.azurewebsites.net/api/v1/blocked-periods/manager/${managerId}`
    );
  }

  // Create a Subject that components will subscribe to
  private _refreshNeeded = new Subject<void>();

  // Expose the subject as an observable to be consumed by other classes
  get refreshNeeded$() {
    return this._refreshNeeded.asObservable();
  }

  // Function to call when we need to refresh the list of blocked periods
  refreshList() {
    this._refreshNeeded.next();
  }
}
