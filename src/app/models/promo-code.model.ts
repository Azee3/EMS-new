export interface PromoCode {
  promoId: string;
  eventId: string;
  code: string;
  discountPercent: number;
  expiryDate: Date;
  applicableTicketTypes: string[]; // list of ticketTypeIds
  isActive: boolean;
}