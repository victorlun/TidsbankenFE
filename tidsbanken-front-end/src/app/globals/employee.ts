import { KeycloakService } from 'keycloak-angular';
import { UserNotFoundError } from '../errors/userNotFoundError';

export class EmployeeId {
  constructor(private readonly keycloakService: KeycloakService) {}

  private userParsedToken =
    this.keycloakService.getKeycloakInstance().idTokenParsed;
  private employeeId(): number {
    if (this.userParsedToken) {
      return this.userParsedToken['employeeId'];
    }
    return 0;
  }

  public getEmployeeId(): number {
    if (this.employeeId() === 0) {
      throw new UserNotFoundError('User not found');
    }
    return this.employeeId();
  }
}
