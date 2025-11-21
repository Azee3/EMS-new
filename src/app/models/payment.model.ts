export interface Payment {
  paymentId: string;
  bookingId: string;
  amount: number;
  method: 'credit-card' | 'e-wallet';
  status: 'successful' | 'failed';
  paidAt: Date;
}