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

// Incorporate specific vip seating for event organizer ----- for select seat generation 
export const MOCK_VIP_SEATS: Seat[] = [
  { 
    seatId: 'A-1',
    row: 'A',
    number: 1,
    section: 'Lower Foyer',
    eventId: 'evt-music-fest-2025',
    ticketTypeId: 'VIP',
    status: 'available'
  },
  { 
    seatId: 'A-2',
    row: 'A',
    number: 2,
    section: 'Lower Foyer',
    eventId: 'evt-music-fest-2025',
    ticketTypeId: 'VIP',
    status: 'available'
  },
  { 
    seatId: 'A-3',
    row: 'A',
    number: 3,
    section: 'Lower Foyer',
    eventId: 'evt-music-fest-2025',
    ticketTypeId: 'VIP',
    status: 'available'
  },
  { 
    seatId: 'A-4',
    row: 'A',
    number: 4,
    section: 'Lower Foyer',
    eventId: 'evt-music-fest-2025',
    ticketTypeId: 'VIP',
    status: 'available'
  }
];




// --- SEATS for all events --- ///////
function generateSeatsForEvent(eventId: string): Seat[] {
  const sections = {
    'Lower Foyer': {
      'A': { start: 15, end: 33 }, // 19 seats
      'B': { start: 15, end: 34 }, // 20 seats
      'C': { start: 15, end: 33 }, // 19 seats
      'D': { start: 15, end: 34 }, // 20 seats
      'E': { start: 15, end: 31 }, // 17 seats
      'F': { start: 15, end: 32 }, // 18 seats
      'G': { start: 15, end: 31 }, // 17 seats
      'H': { start: 15, end: 32 }, // 18 seats
      'J': { start: 15, end: 29 }, // 15 seats
      'K': { start: 15, end: 30 }, // 16 seats
      'L': { start: 1, end: 5 }    // 5 seats
    },
    'Balcony': {
      'AA': { start: 15, end: 36 }, // 22 seats
      'BB': { start: 15, end: 36 }, // 22 seats
      'CC': { start: 15, end: 36 }, // 22 seats
      'DD': { start: 15, end: 35 }  // 21 seats
    }
  };

  const seats: Seat[] = [];
  
  // Define MINIMUM occupancy rates for each event
  const minOccupancyRates = {
    'evt-music-fest-2025': 0.65, // 65% minimum
    'evt-tech-conf-2025': 0.85,  // 85% minimum
    'evt-comedy-night': 0.25     // 25% minimum
  };

  const minSoldRate = minOccupancyRates[eventId as keyof typeof minOccupancyRates];
  
  // Count total seats first
  let totalSeats = 0;
  for (const rows of Object.values(sections)) {
    for (const range of Object.values(rows)) {
      totalSeats += (range.end - range.start + 1);
    }
  }

  const minSoldSeats = Math.floor(totalSeats * minSoldRate);
  let soldCount = 0;

  for (const [sectionName, rows] of Object.entries(sections)) {
    for (const [row, range] of Object.entries(rows)) {
      for (let number = range.start; number <= range.end; number++) {
        const seatId = `seat-${eventId}-${row}${number}`;
        
        // Ensure we meet minimum sold seats requirement
        let status: 'available' | 'sold' | 'reserved';
        if (soldCount < minSoldSeats) {
          status = 'sold';
          soldCount++;
        } else {
          // After meeting minimum, use random distribution with higher probability
          const randomRate = eventId === 'evt-tech-conf-2025' ? 0.15 : 
                           eventId === 'evt-music-fest-2025' ? 0.10 : 0.05;
          status = Math.random() < randomRate ? 'sold' : 'available';
        }
        
        seats.push({
          seatId: seatId,
          row: row,
          number: number,
          section: sectionName as 'Lower Foyer' | 'Balcony',
          eventId: eventId,
          status: status
        });
      }
    }
  }

  // Final count verification
  const finalSoldCount = seats.filter(seat => seat.status === 'sold').length;
  const occupancyRate = (finalSoldCount / totalSeats) * 100;
  console.log(`Generated ${seats.length} seats for ${eventId}, ${finalSoldCount} sold (${occupancyRate.toFixed(1)}% occupancy)`);
  
  return seats;
}

export const MOCK_SEATS: Seat[] = [
  ...generateSeatsForEvent('evt-music-fest-2025'),
  ...generateSeatsForEvent('evt-tech-conf-2025'),
  ...generateSeatsForEvent('evt-comedy-night')
];

// --- TICKET TYPES ---
export const MOCK_TICKET_TYPES: TicketType[] = [
  // Music Festival Ticket Types
  {
    ticketTypeId: 'tt-music-vip',
    eventId: 'evt-music-fest-2025',
    category: 'VIP',
    price: 150.0,
    maxQuantity: 50,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-music-fest-2025' && s.section === 'Lower Foyer' && ['A', 'B'].includes(s.row)).map(s => s.seatId),
  },
  {
    ticketTypeId: 'tt-music-ga',
    eventId: 'evt-music-fest-2025',
    category: 'General Admission',
    price: 75.0,
    maxQuantity: 200,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-music-fest-2025' && s.section === 'Lower Foyer' && ['C', 'D', 'E'].includes(s.row)).map(s => s.seatId),
  },
  {
    ticketTypeId: 'tt-music-balcony',
    eventId: 'evt-music-fest-2025',
    category: 'Balcony',
    price: 50.0,
    maxQuantity: 150,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-music-fest-2025' && s.section === 'Balcony').map(s => s.seatId),
  },
  
  // Tech Conference Ticket Types
  {
    ticketTypeId: 'tt-tech-premium',
    eventId: 'evt-tech-conf-2025',
    category: 'Premium',
    price: 200.0,
    maxQuantity: 100,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-tech-conf-2025' && s.section === 'Lower Foyer' && ['A', 'B', 'C'].includes(s.row)).map(s => s.seatId),
  },
  {
    ticketTypeId: 'tt-tech-standard',
    eventId: 'evt-tech-conf-2025',
    category: 'Standard',
    price: 120.0,
    maxQuantity: 250,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-tech-conf-2025' && s.section === 'Lower Foyer' && ['D', 'E', 'F', 'G'].includes(s.row)).map(s => s.seatId),
  },

  // Comedy Night Ticket Types
  {
    ticketTypeId: 'tt-comedy-vip',
    eventId: 'evt-comedy-night',
    category: 'VIP',
    price: 80.0,
    maxQuantity: 30,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-comedy-night' && s.section === 'Lower Foyer' && ['A', 'B'].includes(s.row)).map(s => s.seatId),
  },
  {
    ticketTypeId: 'tt-comedy-ga',
    eventId: 'evt-comedy-night',
    category: 'General Admission',
    price: 45.0,
    maxQuantity: 200,
    seatsAssigned: MOCK_SEATS.filter(s => s.eventId === 'evt-comedy-night' && s.section === 'Lower Foyer' && ['C', 'D', 'E', 'F', 'G'].includes(s.row)).map(s => s.seatId),
  },
];
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
  {
    promoId: 'promo-student-01',
    eventId: 'evt-tech-conf-2025',
    code: 'STUDENT15',
    discountPercent: 15,
    expiryDate: new Date('2025-11-20'),
    applicableTicketTypes: ['tt-tech-standard'],
    isActive: true,
  },
  {
    promoId: 'promo-group-01',
    eventId: 'evt-comedy-night',
    code: 'GROUP20',
    discountPercent: 20,
    expiryDate: new Date('2025-10-25'),
    applicableTicketTypes: ['tt-comedy-vip', 'tt-comedy-ga'],
    isActive: true,
  },
];

// --- BOOKINGS ---
export const MOCK_BOOKINGS: Booking[] = [
  // Music Festival Bookings
  {
    bookingId: 'booking-music-001',
    attendeeName: 'John Doe',
    attendeeEmail: 'john.doe@email.com',
    eventId: 'evt-music-fest-2025',
    seats: ['seat-evt-music-fest-2025-A15', 'seat-evt-music-fest-2025-A16'],
    ticketTypes: [
      { typeId: 'tt-music-vip', qty: 2 }
    ],
    subtotal: 300.0,
    discount: 30.0, // Applied EARLYBIRD10
    total: 270.0,
    status: 'paid',
    createdAt: new Date('2025-10-01'),
  },
  {
    bookingId: 'booking-music-002',
    attendeeName: 'David Lee',
    attendeeEmail: 'david.lee@email.com',
    eventId: 'evt-music-fest-2025',
    seats: ['seat-evt-music-fest-2025-B20', 'seat-evt-music-fest-2025-B21', 'seat-evt-music-fest-2025-B22'],
    ticketTypes: [
      { typeId: 'tt-music-vip', qty: 3 }
    ],
    subtotal: 450.0,
    discount: 45.0,
    total: 405.0,
    status: 'paid',
    createdAt: new Date('2025-10-05'),
  },
  {
    bookingId: 'booking-music-003',
    attendeeName: 'Sophia Garcia',
    attendeeEmail: 'sophia.garcia@email.com',
    eventId: 'evt-music-fest-2025',
    seats: ['seat-evt-music-fest-2025-C25', 'seat-evt-music-fest-2025-C26'],
    ticketTypes: [
      { typeId: 'tt-music-ga', qty: 2 }
    ],
    subtotal: 150.0,
    discount: 15.0,
    total: 135.0,
    status: 'paid',
    createdAt: new Date('2025-10-10'),
  },

  // Tech Conference Bookings
  {
    bookingId: 'booking-tech-001',
    attendeeName: 'Emma Wilson',
    attendeeEmail: 'emma.wilson@email.com',
    eventId: 'evt-tech-conf-2025',
    seats: ['seat-evt-tech-conf-2025-AA15', 'seat-evt-tech-conf-2025-AA16'],
    ticketTypes: [
      { typeId: 'tt-tech-premium', qty: 2 }
    ],
    subtotal: 400.0,
    discount: 0,
    total: 400.0,
    status: 'paid',
    createdAt: new Date('2025-09-15'),
  },
  {
    bookingId: 'booking-tech-002',
    attendeeName: 'James Wilson',
    attendeeEmail: 'james.wilson@email.com',
    eventId: 'evt-tech-conf-2025',
    seats: ['seat-evt-tech-conf-2025-BB20', 'seat-evt-tech-conf-2025-BB21'],
    ticketTypes: [
      { typeId: 'tt-tech-standard', qty: 2 }
    ],
    subtotal: 240.0,
    discount: 36.0, // Applied STUDENT15
    total: 204.0,
    status: 'paid',
    createdAt: new Date('2025-09-20'),
  },

  // Comedy Night Bookings
  {
    bookingId: 'booking-comedy-001',
    attendeeName: 'Robert Brown',
    attendeeEmail: 'robert.brown@email.com',
    eventId: 'evt-comedy-night',
    seats: ['seat-evt-comedy-night-C25'],
    ticketTypes: [
      { typeId: 'tt-comedy-ga', qty: 1 }
    ],
    subtotal: 45.0,
    discount: 9.0, // Applied GROUP20
    total: 36.0,
    status: 'paid',
    createdAt: new Date('2025-09-20'),
  },
  {
    bookingId: 'booking-comedy-002',
    attendeeName: 'Lisa Taylor',
    attendeeEmail: 'lisa.taylor@email.com',
    eventId: 'evt-comedy-night',
    seats: ['seat-evt-comedy-night-A20', 'seat-evt-comedy-night-A21'],
    ticketTypes: [
      { typeId: 'tt-comedy-vip', qty: 2 }
    ],
    subtotal: 160.0,
    discount: 32.0,
    total: 128.0,
    status: 'paid',
    createdAt: new Date('2025-09-25'),
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