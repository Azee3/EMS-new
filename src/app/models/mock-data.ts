import { User } from './user.model';
import { Event } from './event.model';
import { PromoCode } from './promo-code.model';


// --- USERS ---
export const MOCK_USERS: User[] = [
  {
    userId: 'user-organizer-01',
    fullName: 'organizer 1',
    email: 'org@email.com',
    role: 'organizer',
    organizationName: 'Good EO',
    password: 'org123',
    isFirstLogin: true,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-organizer-02',
    fullName: 'organizer 2',
    email: 'org2@email.com',
    role: 'organizer',
    organizationName: 'Best EO',
    password: 'org123',
    isFirstLogin: false,
    createdAt: new Date('2023-02-15'),
    updatedAt: new Date('2023-02-15'),
  },
  {
    userId: 'user-attendee-01',
    fullName: 'Attendee',
    email: 'attendee@email.com',
    role: 'attendee',
    password: 'att123',
    isFirstLogin: false,
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date('2023-03-20'),
  },

  {
    userId: 'user-admin-01',
    fullName: 'Primary Administrator',
    email: 'superadmin@ticketing.com',
    role: 'admin',
    password: 'admin123',
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


