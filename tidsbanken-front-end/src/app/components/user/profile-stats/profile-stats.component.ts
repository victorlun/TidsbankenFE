import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import {
  ResponseDTO,
  VacationRequestDTO,
} from 'src/app/models/vacation-request';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
})
export class ProfileStatsComponent {
  public usedDays$!: Observable<number>;
  public remainingDays$!: Observable<number>;

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
    private router: Router
  ) {
    this.calculateUsedDays();
  }

  calculateUsedDays(): void {
    const userParsedToken =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    let employeeId = 0;
    if (userParsedToken) {
      employeeId = userParsedToken['employeeId'];
    }
    const totalVacationDays = 25;
    const requestUrl = `https://tbanken.azurewebsites.net/api/v1/requests/employee/${employeeId}`;

    this.usedDays$ = this.http.get<VacationRequestDTO[]>(requestUrl).pipe(
      switchMap((requests) => {
        let totalDays = 0;
        const validRequests = requests.filter(
          (request) => request.vacationResponseId !== null
        );

        const responsePromises = validRequests.map((request) => {
          return this.http
            .get<ResponseDTO>(
              `https://tbanken.azurewebsites.net/api/v1/responses/${request.vacationResponseId}`
            )
            .toPromise();
        });

        return Promise.all(responsePromises).then((responses) => {
          responses.forEach((response, index) => {
            if (response.response === 'APPROVED') {
              const startDate = new Date(validRequests[index].startDate);
              const endDate = new Date(validRequests[index].endDate);
              const diffDays = Math.ceil(
                (endDate.getTime() - startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              );
              totalDays += diffDays;
            }
          });

          return totalDays;
        });
      })
    );
    this.remainingDays$ = this.usedDays$.pipe(
      map((usedDays) => totalVacationDays - usedDays)
    );
  }

  goToVacationRequests() {
    this.router.navigate(['/vacation-requests']);
  }
}
