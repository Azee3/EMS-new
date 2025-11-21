export interface AdminUsageReport {
  logins: number;
  eventsManaged: number;
  reportsGenerated: number;
  totalEventsHosted: number;
  auditoriumUsagePercentage: number;
  idleDays: number;
  usageByDate: { date: string; count: number }[];
}