import { VacationType } from '../models/vacation-request';

export function getEnumValues(enumObject: any): string[] {
  return Object.keys(enumObject).map((key) => enumObject[key]);
}

export function getVacationTypeKeyStringByValue(value: string): string {
  switch (value) {
    case 'Sick Leave':
      return 'SICK_LEAVE';
    case 'Vacation Leave':
      return 'VACATION_LEAVE';
    case 'Parental Leave':
      return 'PARENTAL_LEAVE';
    case 'Holiday':
      return 'PUBLIC_HOLIDAY';
    case 'Other':
      return 'OTHER';
    default:
      return 'MISSING';
  }
}

export function getVacationTypeEnumKeyByKeyString(key: string): VacationType {
  switch (key) {
    case 'SICK_LEAVE':
      return VacationType.SICK_LEAVE;
    case 'VACATION_LEAVE':
      return VacationType.VACATION_LEAVE;
    case 'PARENTAL_LEAVE':
      return VacationType.PARENTAL_LEAVE;
    case 'PUBLIC_HOLIDAY':
      return VacationType.PUBLIC_HOLIDAY;
    case 'OTHER':
      return VacationType.OTHER;
    default:
      return VacationType.MISSING;
  }
}
