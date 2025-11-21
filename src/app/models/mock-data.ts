import { User } from './user.model';
import { Admin } from './admin.model';
import { Event } from './event.model';
import { TicketType } from './ticket-type.model';
import { Seat } from './seat.model';
import { PromoCode } from './promo-code.model';
import { Booking } from './booking.model';
import { Payment } from './payment.model';
import { Ticket } from './ticket.model';
import { Waitlist } from './waitlist.model';

// --- USERS ---
export const MOCK_USERS: User[] = [
  {
    userId: 'user-admin-01',
    fullName: 'Admin User',
    email: 'admin@ticketing.com',
    phone: '111-222-3333',
    role: 'admin',
    passwordHash: 'hashed_password_admin',
    isFirstLogin: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
  {
    userId: 'user-organizer-01',
    fullName: 'Music Fest Co',
    email: 'contact@musicfest.co',
    phone: '444-555-6666',
    role: 'organizer',
    organizationName: 'Music Fest Co',
    passwordHash: 'hashed_password_organizer',
    isFirstLogin: false,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-attendee-01',
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '777-888-9999',
    role: 'attendee',
    passwordHash: 'hashed_password_attendee',
    isFirstLogin: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
  },
];

// --- ADMINS ---
export const MOCK_ADMINS: Admin[] = [
  {
    adminId: 'admin-001',
    fullName: 'Primary Administrator',
    email: 'superadmin@ticketing.com',
    phone: '000-111-2222',
    role: 'admin',
    // For development convenience this is stored as plaintext 'admin123'.
    // AuthService will accept plaintext seeds during dev.
    passwordHash: 'admin123',
    isActive: true,
    lastLogin: null,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  },
];



// --- EVENTS ---
export const MOCK_EVENTS: Event[] = [
  {
    eventId: 'evt-music-fest-2025',
    organizerId: 'user-organizer-01',
    title: 'Annual Music Festival 2025',
    description: 'A celebration of live music from various genres.',
    posterURL: 'https://via.placeholder.com/300x400.png?text=Music+Fest+2025',
    date: new Date('2025-12-15'),
    startTime: '18:00',
    endTime: '23:00',
    status: 'upcoming',
    seatingLayoutId: 'layout-standard-auditorium',
    createdAt: new Date('2025-05-01'),
    updatedAt: new Date('2025-05-01'),
  },
  {
    eventId: 'evt-tech-conf-2025',
    organizerId: 'user-organizer-01',
    title: 'Future of Tech Conference',
    description: 'Exploring the next wave of technological innovations.',
    posterURL: 'https://via.placeholder.com/300x400.png?text=Tech+Conf+2025',
    date: new Date('2025-11-28'),
    startTime: '09:00',
    endTime: '17:00',
    status: 'upcoming',
    seatingLayoutId: 'layout-standard-auditorium',
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-06-10'),
  },
];

// --- SEATS for evt-music-fest-2025 ---
export const MOCK_SEATS: Seat[] = [
  // Lower Foyer
  { seatId: 'seat-A1', row: 'A', number: 1, section: 'Lower Foyer', eventId: 'evt-music-fest-2025', status: 'available' },
  { seatId: 'seat-A2', row: 'A', number: 2, section: 'Lower Foyer', eventId: 'evt-music-fest-2025', status: 'sold' },
  { seatId: 'seat-A3', row: 'A', number: 3, section: 'Lower Foyer', eventId: 'evt-music-fest-2025', status: 'available' },
  // Balcony
  { seatId: 'seat-B1', row: 'B', number: 1, section: 'Balcony', eventId: 'evt-music-fest-2025', status: 'available' },
  { seatId: 'seat-B2', row: 'B', number: 2, section: 'Balcony', eventId: 'evt-music-fest-2025', status: 'reserved' },
];

// --- TICKET TYPES for evt-music-fest-2025 ---
export const MOCK_TICKET_TYPES: TicketType[] = [
  {
    ticketTypeId: 'tt-vip-01',
    eventId: 'evt-music-fest-2025',
    category: 'VIP',
    price: 150.0,
    maxQuantity: 50,
    seatsAssigned: ['seat-A1', 'seat-A2', 'seat-A3'],
  },
  {
    ticketTypeId: 'tt-ga-01',
    eventId: 'evt-music-fest-2025',
    category: 'General Admission',
    price: 75.0,
    maxQuantity: 200,
    seatsAssigned: ['seat-B1', 'seat-B2'],
  },
];

// --- PROMO CODES ---
export const MOCK_PROMO_CODES: PromoCode[] = [
  {
    promoId: 'promo-earlybird-01',
    eventId: 'evt-music-fest-2025',
    code: 'EARLYBIRD10',
    discountPercent: 10,
    expiryDate: new Date('2025-11-30'),
    applicableTicketTypes: ['tt-vip-01', 'tt-ga-01'],
    isActive: true,
  },
];

// --- BOOKINGS ---
export const MOCK_BOOKINGS: Booking[] = [
  {
    bookingId: 'booking-xyz-123',
    attendeeName: 'John Doe',
    attendeeEmail: 'john.doe@email.com',
    eventId: 'evt-music-fest-2025',
    seats: ['seat-A2'],
    ticketTypes: [{ typeId: 'tt-vip-01', qty: 1 }],
    subtotal: 150.0,
    discount: 0,
    total: 150.0,
    status: 'paid',
    createdAt: new Date('2025-10-01'),
  },
];

// --- PAYMENTS ---
export const MOCK_PAYMENTS: Payment[] = [
  {
    paymentId: 'pay-abc-456',
    bookingId: 'booking-xyz-123',
    amount: 150.0,
    method: 'credit-card',
    status: 'successful',
    paidAt: new Date('2025-10-01'),
  },
];

// --- TICKETS (QR) ---
export const MOCK_TICKETS: Ticket[] = [
  {
    ticketId: 'tkt-final-789',
    bookingId: 'booking-xyz-123',
    seatId: 'seat-A2',
    qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...', // Placeholder for a real QR code
    isCheckedIn: false,
  },
];

// --- WAITLIST ---
export const MOCK_WAITLIST: Waitlist[] = [
  {
    waitlistId: 'wait-001',
    eventId: 'evt-tech-conf-2025', // Assuming this event is sold out
    attendeeName: 'Jane Smith',
    attendeeEmail: 'jane.smith@email.com',
    position: 1,
    notified: false,
    joinedAt: new Date(),
  },
];

