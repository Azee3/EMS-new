export interface TicketType {
  ticketTypeId: string;
  eventId: string;
  category: string;
  price: number;
  maxQuantity: number;
  seatsAssigned: string[]; // list of seatIds
}