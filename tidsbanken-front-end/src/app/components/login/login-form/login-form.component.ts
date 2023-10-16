import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { EmployeePostDTO } from 'src/app/models/user';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly http: HttpClient,
    private readonly employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const userParsedToken =
      this.keycloakService.getKeycloakInstance().idTokenParsed;
    if (userParsedToken) {
      const newEmployee: EmployeePostDTO = {
        employeeId: userParsedToken['employee_id'],
        manager: userParsedToken['manager_id'],
        firstName: userParsedToken['given_name'],
        lastName: userParsedToken['family_name'],
        email: userParsedToken['email'],
        authRole: userParsedToken['auth_role'],
        role: userParsedToken['work_role'],
      };
      this.checkIfUserExists(newEmployee);
    }

    this.keycloakService.isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.router.navigateByUrl('dashboard');

        this.http
          .get(
            'https://tbanken.azurewebsites.net/api/v1/resources/restricted',
            { responseType: 'text' }
          )
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.error('Error occurred:', error);
            }
          );

        this.http
          .get('https://tbanken.azurewebsites.net/api/v1/resources/admin', {
            responseType: 'text',
          })
          .subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.error('Error occurred:', error);
            }
          );
      }
    });
  }

  login(): void {
    this.keycloakService.login();
  }

  createNewUser(newEmployee: EmployeePostDTO) {
    this.employeeService.createEmployee(newEmployee).subscribe(
      (response) => {
        console.log('Employee created:', response);
      },
      (error) => {
        console.error('Error creating employee:', error);
      }
    );
  }

  checkIfUserExists(newEmployee: EmployeePostDTO) {
    this.employeeService.getUser(newEmployee.employeeId).subscribe(
      (response) => {
        if (response) {
          console.log('User already exists:', response);
        } else {
          this.createNewUser(newEmployee);
          console.log("User doesn't exist", response);
        }
      },
      (error) => {
        this.createNewUser(newEmployee);
        console.error('An error occurred:', error);
      }
    );
  }
}
