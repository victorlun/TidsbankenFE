export interface BlockedPeriodDTO {
  blockedPeriodId: number;
  startDate: string;
  endDate: string;
}

export interface BlockedPeriod {
  startDate: Date;
  endDate: Date;
}

export interface BlockedPeriodListItem {
  blockedPeriodId: number;
  startDate: Date;
  endDate: Date;
}
