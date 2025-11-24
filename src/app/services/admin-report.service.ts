import { Injectable } from '@angular/core';
import { MOCK_EVENTS, MOCK_BOOKINGS, MOCK_USERS, MOCK_WAITLIST, MOCK_PAYMENTS, MOCK_SEATS, MOCK_TICKET_TYPES } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  getAuditoriumUsage() {
    const usage = MOCK_EVENTS.map(event => ({
      date: event.date,
      eventName: event.title,
      status: 'Booked'
    }));
    // For simplicity, we'll just show booked dates. A more complex implementation could show free dates.
    return {
      occupiedDates: usage,
      usageFrequency: usage.length,
      freeDays: 30 - usage.length, // Assuming a 30 day month
      bookedDays: usage.length
    };
  }

  getEventOccupancy() {
    return MOCK_EVENTS.map(event => {
      const eventSeats = MOCK_SEATS.filter(s => s.eventId === event.eventId);
      const totalSeats = eventSeats.length;
      const soldSeats = eventSeats.filter(seat => seat.status === 'sold').length;
      const occupancy = totalSeats > 0 ? (soldSeats / totalSeats) * 100 : 0;
      return {
        eventName: event.title,
        totalSeats,
        soldSeats,
        occupancy: occupancy.toFixed(2) + '%'
      };
    });
  }

  getTicketSalesSummary() {
    // Count actual sold seats from MOCK_SEATS instead of bookings
    const eventSales = MOCK_EVENTS.map(event => {
      const soldSeats = MOCK_SEATS.filter(s => s.eventId === event.eventId && s.status === 'sold').length;
      return { eventName: event.title, ticketsSold: soldSeats };
    });
    
    const highestSelling = eventSales.reduce((max, event) => 
      event.ticketsSold > max.ticketsSold ? event : max
    );
    const lowestSelling = eventSales.reduce((min, event) => 
      event.ticketsSold < min.ticketsSold ? event : min
    );

    const totalTicketsSold = eventSales.reduce((sum, event) => sum + event.ticketsSold, 0);
    const totalRevenue = MOCK_PAYMENTS.filter(p => p.status === 'successful').reduce((acc, p) => acc + p.amount, 0);

    return {
      totalTicketsSold,
      totalRevenue,
      highestSellingEvent: highestSelling,
      lowestPerformingEvent: lowestSelling
    };
  }

  getOrganizerPerformance() {
    const organizers = MOCK_USERS.filter(u => u.role === 'organizer');
    return organizers.map(organizer => {
      const events = MOCK_EVENTS.filter(e => e.organizerId === organizer.userId);
      // Count sold seats from MOCK_SEATS instead of bookings
      const ticketsSold = events.reduce((acc, event) => {
        const eventSoldSeats = MOCK_SEATS.filter(s => s.eventId === event.eventId && s.status === 'sold').length;
        return acc + eventSoldSeats;
      }, 0);
      
      const revenue = MOCK_PAYMENTS.filter(p => 
        MOCK_BOOKINGS.some(b => 
          b.bookingId === p.bookingId && 
          events.some(e => e.eventId === b.eventId) && 
          p.status === 'successful'
        )
      ).reduce((acc, p) => acc + p.amount, 0);
      
      return {
        organizerName: organizer.fullName,
        eventsCreated: events.length,
        ticketsSold,
        revenue
      };
    });
  }

  getWaitlistOverview() {
    const waitlistedEvents = MOCK_EVENTS.filter(e => MOCK_WAITLIST.some(w => w.eventId === e.eventId));
    const totalWaitlistEntries = MOCK_WAITLIST.length;
    const waitingAttendees = MOCK_WAITLIST.filter(w => !w.notified);
    return {
      eventsWithWaitlists: waitlistedEvents.length,
      overCapacityEvents: waitlistedEvents.map(e => e.title),
      totalWaitlistEntries,
      attendeesStillWaiting: waitingAttendees.length,
      notificationsSent: MOCK_WAITLIST.length - waitingAttendees.length
    };
  }

  getPaymentSummary() {
    const successfulPayments = MOCK_PAYMENTS.filter(p => p.status === 'successful').length;
    const failedPayments = MOCK_PAYMENTS.filter(p => p.status === 'failed').length;
    const totalRevenue = MOCK_PAYMENTS.filter(p => p.status === 'successful').reduce((acc, p) => acc + p.amount, 0);
    
    const eventRevenue = MOCK_EVENTS.map(event => {
      // Calculate revenue from successful payments for this event
      const revenue = MOCK_PAYMENTS.filter(p => 
        MOCK_BOOKINGS.some(b => 
          b.bookingId === p.bookingId && 
          b.eventId === event.eventId && 
          p.status === 'successful'
        )
      ).reduce((acc, p) => acc + p.amount, 0);
      return { eventName: event.title, revenue: revenue };
    });
    
    const highestRevenueEvent = eventRevenue.reduce((max, event) => 
      event.revenue > max.revenue ? event : max
    );

    return {
      successfulPayments,
      failedPayments,
      totalRevenue,
      revenueTrend: [ // mock trend data - you could generate this from actual payment dates
        { month: 'Jan', revenue: 1500 },
        { month: 'Feb', revenue: 2500 },
        { month: 'Mar', revenue: 2000 },
        { month: 'Apr', revenue: 3200 },
        { month: 'May', revenue: 2800 },
        { month: 'Jun', revenue: 4100 }
      ],
      eventWithHighestRevenue: highestRevenueEvent
    };
  }
}