// The data type used when transferring data between backend
export interface VacationRequestDTO {
  vacationRequestId: number;
  startDate: string;
  endDate: string;
  employeeId: number;
  firstName: string;
  lastName: string;
  vacationType: string;
  notes: string;
  vacationResponseId: number | null;
}

export interface ResponseDTO {
  vacationResponseId?: number;
  vacationRequestId: number;
  response: string;
  responseComment: string;
}

export interface VacationRequestPostDTO {
  startDate: string;
  endDate: string;
  employeeId: number;
  vacationType: string;
  notes: string;
}

export interface ResponsePostDTO {
  vacationRequestId: number;
  response: string;
  responseComment: string;
}

// Frontend model for complete Vacation request
export interface VacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  employeeId: number;
  employeeName: string;
  vacationType: VacationType;
  status: VacationRequestStatus;
  requestComment: string | null;
  responseComment: string | null;
}

// For user specific history of vacation requests
export interface UserVacationRequest {
  id: number;
  startDate: string;
  endDate: string;
  vacationType: VacationType;
  status: VacationRequestStatus;
  requestComment: string | null;
  responseComment: string | null;
}

// Enum for request's vacation type
export enum VacationType {
  SICK_LEAVE = 'Sick Leave',
  VACATION_LEAVE = 'Vacation Leave',
  PARENTAL_LEAVE = 'Parental Leave',
  PUBLIC_HOLIDAY = 'Holiday',
  OTHER = 'Other',
  MISSING = '...',
}

// Enum for the request's status
export enum VacationRequestStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  DENIED = 'Denied',
  MISSING = '...',
}

// For transplaying missing data
export const defaultVacationRequest: VacationRequest = {
  id: -1,
  startDate: '...',
  endDate: '...',
  employeeId: -1,
  employeeName: '...',
  vacationType: VacationType.MISSING,
  status: VacationRequestStatus.MISSING,
  requestComment: null,
  responseComment: null,
};

export const defaultUserVacationRequest: UserVacationRequest = {
  id: -1,
  startDate: '...',
  endDate: '',
  vacationType: VacationType.MISSING,
  status: VacationRequestStatus.MISSING,
  requestComment: null,
  responseComment: null,
};
