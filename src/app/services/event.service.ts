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
        title: 'Comic Con 2025',
        description: 'Worl Class Anime Convention',
        date: new Date('2025-12-01T18:00:00'),
        startTime: '18:00',
        endTime: '22:00',
        location: 'Help Auditorium',
        ticketsLeft: 100,
        status: 'upcoming',
        seatingLayoutId: 'layout1',
        createdAt: now,
        updatedAt: now,
      },
      {
        eventId: 'e2',
        organizerId: 'o2',
        title: 'Music Fest',
        description: 'A music festival featuring the best bands.',
        date: new Date('2025-11-15T20:00:00'), 
        startTime: '20:00',
        endTime: '23:30',
        location: 'Help Auditorium',
        ticketsLeft: 0,
        status: 'past',
        seatingLayoutId: 'layout2',
        createdAt: now,
        updatedAt: now,
      },
      {
        eventId: 'e3',
        organizerId: 'o1',
        title: 'Star Wars: Press Conference ',
        description: 'Interview Actors from the movies.',
        date: new Date('2026-01-10T19:30:00'),
        startTime: '19:30',
        endTime: '21:30',
        location: 'Help Auditorium',
        ticketsLeft: 0, 
        status: 'upcoming',
        seatingLayoutId: 'layout3',
        createdAt: now,
        updatedAt: now,
      },
       {
        eventId: 'e4',
        organizerId: 'o2',
        title: 'International Science Expo',
        description: 'World Leading Scientist Expo',
        date: new Date('2025-10-05T19:00:00'),
        startTime: '19:00',
        endTime: '23:00',
        location: 'Help auditorium',
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