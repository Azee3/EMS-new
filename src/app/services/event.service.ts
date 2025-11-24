import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Event } from '../models/event.model';

const EVENTS_KEY = 'ticketing_events_v2'; // Bump version to avoid conflicts with old data

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();

  private selectedEventSubject = new BehaviorSubject<Event | null>(null);
  public selectedEvent$ = this.selectedEventSubject.asObservable();

  constructor() {
    const fromStorage = this.readFromStorage();
    if (fromStorage && fromStorage.length) {
      // When reading from storage, dates are strings, so we need to convert them back to Date objects
      const eventsWithDates = fromStorage.map(e => ({
        ...e,
        date: new Date(e.date),
        createdAt: new Date(e.createdAt),
        updatedAt: new Date(e.updatedAt),
      }));
      this.eventsSubject.next(eventsWithDates);
    } else {
      const seeded = this.seedEvents();
      this.eventsSubject.next(seeded);
    }
  }

  private seedEvents(): Event[] {
    const now = new Date();
    const list: Event[] = [
      {
        eventId: 'e1',
        organizerId: 'o1',
        title: 'Tech Conference 2025',
        description: 'The biggest tech conference of the year.',
        date: new Date('2025-12-01T18:00:00'),
        startTime: '18:00',
        endTime: '22:00',
        location: 'Metro Convention Center',
        ticketsLeft: 100,
        status: 'upcoming',
        seatingLayoutId: 'layout1',
        createdAt: now,
        updatedAt: now,
      },
      {
        eventId: 'e2',
        organizerId: 'o2',
        title: 'Indie Music Fest',
        description: 'A festival featuring the best indie bands.',
        date: new Date('2025-11-15T20:00:00'), // A past event
        startTime: '20:00',
        endTime: '23:30',
        location: 'The Grand Ballroom',
        ticketsLeft: 0,
        status: 'past',
        seatingLayoutId: 'layout2',
        createdAt: now,
        updatedAt: now,
      },
      {
        eventId: 'e3',
        organizerId: 'o1',
        title: 'Art & Design Expo',
        description: 'An expo showcasing modern art and design.',
        date: new Date('2026-01-10T19:30:00'),
        startTime: '19:30',
        endTime: '21:30',
        location: 'City Art Gallery',
        ticketsLeft: 0, // No tickets left, good for waitlist testing
        status: 'upcoming',
        seatingLayoutId: 'layout3',
        createdAt: now,
        updatedAt: now,
      },
       {
        eventId: 'e4',
        organizerId: 'o2',
        title: 'Winter Gala 2025',
        description: 'The annual winter charity gala.',
        date: new Date('2025-10-05T19:00:00'),
        startTime: '19:00',
        endTime: '23:00',
        location: 'The Royal Palace',
        ticketsLeft: 10,
        status: 'cancelled', // A cancelled event
        seatingLayoutId: 'layout1',
        createdAt: now,
        updatedAt: now,
      },
    ];
    this.writeToStorage(list);
    return list;
  }

  private readFromStorage(): Event[] | null {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null;
      const raw = window.localStorage.getItem(EVENTS_KEY);
      return raw ? (JSON.parse(raw) as Event[]) : null;
    } catch {
      return null;
    }
  }

  private writeToStorage(events: Event[]) {
    try {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
      }
    } catch {
      // ignore storage errors
    }
    // Always emit updated events to subscribers
    this.eventsSubject.next(events);
  }

  getEvents(): Event[] {
    return this.eventsSubject.value;
  }

  getEventById(eventId: string): Event | undefined {
    return this.eventsSubject.value.find(event => event.eventId === eventId);
  }

  setSelectedEvent(event: Event | null) {
    this.selectedEventSubject.next(event);
  }

  bookSeats(eventId: string, count: number): boolean {
    const events = this.getEvents().map(e => ({ ...e }));
    const idx = events.findIndex(e => e.eventId === eventId);
    if (idx === -1) return false;
    if (events[idx].ticketsLeft < count) return false;
    events[idx].ticketsLeft -= count;
    this.writeToStorage(events);
    return true;
  }
}