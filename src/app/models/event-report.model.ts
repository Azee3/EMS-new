export interface EventReport {
  eventId: string;
  totalTicketsSold: number;
  totalRevenue: number;
  seatOccupancy: number;
  ticketTypeBreakdown: { typeName: string; count: number }[];
}