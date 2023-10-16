export interface User {
  id: number;
  username: string;
}

// Change according to keycloak endpoint
export interface EmployeeDTO {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  authRole: string;
  managerId: number;
}

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
}

export interface DetailedEmployee extends Employee {
  email: string;
  authRole: string;
  managerId: number;
}

// Resource as an employee - full name and employee id
export interface SchedulerResource {
  name: string;
  id: string;
}

export interface EmployeePostDTO {
  employeeId: number;
  manager: number;
  firstName: string;
  lastName: string;
  email: string;
  authRole: string;
  role: string;
}
