export interface Booking {
  bookingId: string;
  attendeeName: string;
  attendeeEmail: string;
  eventId: string;
  seats: string[]; // list of seatIds
  ticketTypes: { typeId: string; qty: number }[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  status: 'pending' | 'paid' | 'cancelled';
  createdAt: Date;
}