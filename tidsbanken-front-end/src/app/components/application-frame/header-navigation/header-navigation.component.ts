import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { UserNotFoundError } from 'src/app/errors/userNotFoundError';
import { EmployeeId } from 'src/app/globals/employee';
import { Employee, EmployeeDTO } from 'src/app/models/user';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './header-navigation.component.html',
  styleUrls: ['./header-navigation.component.scss'],
})
export class HeaderNavigationComponent implements OnInit {
  user: Employee | null = null;
  username: string | null = null;
  authenticated: boolean = false;

  constructor(
    private readonly router: Router,
    private keycloakService: KeycloakService,
    private employeeService: EmployeeService
  ) {}

  // Triggered when clicking user icon to open dropdown menu
  openUserDropdownMenu(menuTrigger: MatMenuTrigger) {
    if (menuTrigger) {
      menuTrigger.openMenu();
    }
  }

  ngOnInit(): void {
    // Authenticate user and navigate to homepage/dashboard page
    this.keycloakService.isLoggedIn().then((isLoggedIn: boolean) => {
      this.authenticated = isLoggedIn;
      if (!this.authenticated) this.router.navigateByUrl('/');
    });
    this.getUser();
  }

  // Get user to be able to display the name
  getUser() {
    try {
      // Get the userId
      const employeeIdInstance = new EmployeeId(this.keycloakService); // Pass the keycloakService instance to the constructor
      const employeeId = employeeIdInstance.getEmployeeId();

      this.employeeService
        .getUser(employeeId)
        .pipe(
          map((employee: EmployeeDTO) => ({
            employeeId: employee.employeeId,
            firstName: employee.firstName,
            lastName: employee.lastName,
          }))
        )
        .subscribe({
          next: (employee: Employee) => {
            this.user = employee;
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

  logout() {
    this.keycloakService.logout('http://localhost:4200/');
  }
}
