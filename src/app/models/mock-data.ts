import { User } from './user.model';
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
    userId: 'user-organizer-01',
    fullName: 'organizer 1',
    email: 'org@email.com',
    role: 'organizer',
    organizationName: 'Good EO',
    passwordHash: 'org123',
    isFirstLogin: false,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-attendee-01',
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    role: 'attendee',
    passwordHash: 'hashed_password_attendee',
    isFirstLogin: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
  },

  {
    userId: 'user-admin-01',
    fullName: 'Primary Administrator',
    email: 'superadmin@ticketing.com',
    role: 'admin',
    passwordHash: 'admin123',
    isFirstLogin: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-03-15'),
  },
];

// --- EVENTS ---
export const MOCK_EVENTS: Event[] = [
  {
    eventId: 'evt-music-fest-2025',
    organizerId: 'user-organizer-01',
    title: 'Annual Music Festival 2025',
    description: 'A celebration of live music from various genres featuring top artists.',
    posterURL: 'https://via.placeholder.com/300x400.png?text=Music+Fest+2025',
    date: new Date('2025-12-15'),
    startTime: '18:00',
    endTime: '23:00',
    location: 'HELP Events Auditorium',
    ticketsLeft: 95, // ~65% sold (271 * 0.35 = ~95 left)
    status: 'upcoming',
    seatingLayoutId: 'layout-standard-auditorium',
    createdAt: new Date('2025-05-01'),
    updatedAt: new Date('2025-10-01'),
  },
  {
    eventId: 'evt-tech-conf-2025',
    organizerId: 'user-organizer-02',
    title: 'Future of Tech Conference 2025',
    description: 'Exploring the next wave of technological innovations with industry leaders.',
    posterURL: 'https://via.placeholder.com/300x400.png?text=Tech+Conf+2025',
    date: new Date('2025-11-28'),
    startTime: '09:00',
    endTime: '17:00',
    location: 'HELP Events Auditorium',
    ticketsLeft: 41, // ~85% sold (271 * 0.15 = ~41 left)
    status: 'upcoming',
    seatingLayoutId: 'layout-standard-auditorium',
    createdAt: new Date('2025-06-10'),
    updatedAt: new Date('2025-10-20'),
  },
  {
    eventId: 'evt-comedy-night',
    organizerId: 'user-organizer-01',
    title: 'Comedy Night Special',
    description: 'An evening of laughter with top comedians.',
    posterURL: 'https://via.placeholder.com/300x400.png?text=Comedy+Night',
    date: new Date('2025-10-30'),
    startTime: '20:00',
    endTime: '22:30',
    location: 'HELP Events Auditorium',
    ticketsLeft: 203, // ~25% sold (271 * 0.75 = ~203 left)
    status: 'upcoming',
    seatingLayoutId: 'layout-standard-auditorium',
    createdAt: new Date('2025-08-15'),
    updatedAt: new Date('2025-09-25'),
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
    applicableTicketTypes: ['tt-music-vip', 'tt-music-ga', 'tt-music-balcony'],
    isActive: true,
  },
];




// --- PAYMENTS ---
export const MOCK_PAYMENTS: Payment[] = [
  {
    paymentId: 'pay-music-001',
    bookingId: 'booking-music-001',
    amount: 270.0,
    method: 'credit-card',
    status: 'successful',
    paidAt: new Date('2025-10-01'),
  },
  {
    paymentId: 'pay-music-002',
    bookingId: 'booking-music-002',
    amount: 405.0,
    method: 'e-wallet',
    status: 'successful',
    paidAt: new Date('2025-10-05'),
  },
  {
    paymentId: 'pay-music-003',
    bookingId: 'booking-music-003',
    amount: 135.0,
    method: 'credit-card',
    status: 'successful',
    paidAt: new Date('2025-10-10'),
  },
  {
    paymentId: 'pay-tech-001',
    bookingId: 'booking-tech-001',
    amount: 400.0,
    method: 'e-wallet',
    status: 'successful',
    paidAt: new Date('2025-09-15'),
  },
  {
    paymentId: 'pay-tech-002',
    bookingId: 'booking-tech-002',
    amount: 204.0,
    method: 'credit-card',
    status: 'successful',
    paidAt: new Date('2025-09-20'),
  },
  {
    paymentId: 'pay-comedy-001',
    bookingId: 'booking-comedy-001',
    amount: 36.0,
    method: 'credit-card',
    status: 'successful',
    paidAt: new Date('2025-09-20'),
  },
  {
    paymentId: 'pay-comedy-002',
    bookingId: 'booking-comedy-002',
    amount: 128.0,
    method: 'e-wallet',
    status: 'successful',
    paidAt: new Date('2025-09-25'),
  },
];

// --- TICKETS (QR) ---
export const MOCK_TICKETS: Ticket[] = [
  // Music Festival Tickets
  {
    ticketId: 'tkt-music-001',
    bookingId: 'booking-music-001',
    seatId: 'seat-evt-music-fest-2025-A15',
    qrCode: 'QR_CODE_MUSIC_A15',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-002',
    bookingId: 'booking-music-001',
    seatId: 'seat-evt-music-fest-2025-A16',
    qrCode: 'QR_CODE_MUSIC_A16',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-003',
    bookingId: 'booking-music-002',
    seatId: 'seat-evt-music-fest-2025-B20',
    qrCode: 'QR_CODE_MUSIC_B20',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-004',
    bookingId: 'booking-music-002',
    seatId: 'seat-evt-music-fest-2025-B21',
    qrCode: 'QR_CODE_MUSIC_B21',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-005',
    bookingId: 'booking-music-002',
    seatId: 'seat-evt-music-fest-2025-B22',
    qrCode: 'QR_CODE_MUSIC_B22',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-006',
    bookingId: 'booking-music-003',
    seatId: 'seat-evt-music-fest-2025-C25',
    qrCode: 'QR_CODE_MUSIC_C25',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-music-007',
    bookingId: 'booking-music-003',
    seatId: 'seat-evt-music-fest-2025-C26',
    qrCode: 'QR_CODE_MUSIC_C26',
    isCheckedIn: false,
  },

  // Tech Conference Tickets
  {
    ticketId: 'tkt-tech-001',
    bookingId: 'booking-tech-001',
    seatId: 'seat-evt-tech-conf-2025-AA15',
    qrCode: 'QR_CODE_TECH_AA15',
    isCheckedIn: true,
  },
  {
    ticketId: 'tkt-tech-002',
    bookingId: 'booking-tech-001',
    seatId: 'seat-evt-tech-conf-2025-AA16',
    qrCode: 'QR_CODE_TECH_AA16',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-tech-003',
    bookingId: 'booking-tech-002',
    seatId: 'seat-evt-tech-conf-2025-BB20',
    qrCode: 'QR_CODE_TECH_BB20',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-tech-004',
    bookingId: 'booking-tech-002',
    seatId: 'seat-evt-tech-conf-2025-BB21',
    qrCode: 'QR_CODE_TECH_BB21',
    isCheckedIn: false,
  },

  // Comedy Night Tickets
  {
    ticketId: 'tkt-comedy-001',
    bookingId: 'booking-comedy-001',
    seatId: 'seat-evt-comedy-night-C25',
    qrCode: 'QR_CODE_COMEDY_C25',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-comedy-002',
    bookingId: 'booking-comedy-002',
    seatId: 'seat-evt-comedy-night-A20',
    qrCode: 'QR_CODE_COMEDY_A20',
    isCheckedIn: false,
  },
  {
    ticketId: 'tkt-comedy-003',
    bookingId: 'booking-comedy-002',
    seatId: 'seat-evt-comedy-night-A21',
    qrCode: 'QR_CODE_COMEDY_A21',
    isCheckedIn: false,
  },
];

// --- WAITLIST ---
export const MOCK_WAITLIST: Waitlist[] = [
  {
    waitlistId: 'wait-tech-001',
    eventId: 'evt-tech-conf-2025',
    attendeeName: 'David Lee',
    attendeeEmail: 'david.lee@email.com',
    position: 1,
    notified: true,
    joinedAt: new Date('2025-10-10'),
  },
  {
    waitlistId: 'wait-tech-002',
    eventId: 'evt-tech-conf-2025',
    attendeeName: 'Sophia Garcia',
    attendeeEmail: 'sophia.garcia@email.com',
    position: 2,
    notified: false,
    joinedAt: new Date('2025-10-12'),
  },
  {
    waitlistId: 'wait-tech-003',
    eventId: 'evt-tech-conf-2025',
    attendeeName: 'James Wilson',
    attendeeEmail: 'james.wilson@email.com',
    position: 3,
    notified: false,
    joinedAt: new Date('2025-10-15'),
  },
  {
    waitlistId: 'wait-tech-004',
    eventId: 'evt-tech-conf-2025',
    attendeeName: 'Maria Rodriguez',
    attendeeEmail: 'maria.rodriguez@email.com',
    position: 4,
    notified: false,
    joinedAt: new Date('2025-10-18'),
  },
];
