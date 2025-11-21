export interface Ticket {
  ticketId: string;
  bookingId: string;
  seatId: string;
  qrCode: string; // URL or base64 string of the QR code image
  isCheckedIn: boolean;
  checkedInAt?: Date;
}