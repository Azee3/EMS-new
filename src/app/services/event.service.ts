import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  ticketsLeft: number;
}

const EVENTS_KEY = 'ticketing_events_v1';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventsSubject = new BehaviorSubject<EventItem[]>([]);
  public events$ = this.eventsSubject.asObservable();

  private selectedEventSubject = new BehaviorSubject<EventItem | null>(null);
  public selectedEvent$ = this.selectedEventSubject.asObservable();

  constructor() {
    // Initialize events safely (avoid using localStorage during SSR/build)
    const fromStorage = this.readFromStorage();
    if (fromStorage && fromStorage.length) {
      this.eventsSubject.next(fromStorage);
    } else {
      const seeded = this.seedEvents();
      this.eventsSubject.next(seeded);
    }
  }

  private seedEvents(): EventItem[] {
    const list: EventItem[] = [
      { id: 'e1', name: 'Event 1', date: '2025-12-01', time: '18:00', location: 'Venue A', ticketsLeft: 100 },
      { id: 'e2', name: 'Event 2', date: '2025-12-15', time: '20:00', location: 'Venue B', ticketsLeft: 50 },
      { id: 'e3', name: 'Event 3', date: '2026-01-10', time: '19:30', location: 'Venue C', ticketsLeft: 0 }
    ];
    // Persist only if localStorage is available; writeToStorage handles the guard and will still update subject
    this.writeToStorage(list);
    return list;
  }

  private readFromStorage(): EventItem[] | null {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null;
      const raw = window.localStorage.getItem(EVENTS_KEY);
      return raw ? (JSON.parse(raw) as EventItem[]) : null;
    } catch {
      return null;
    }
  }

  private writeToStorage(events: EventItem[]) {
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

  getEvents(): EventItem[] {
    return this.eventsSubject.value;
  }

  getEventById(eventId: string): EventItem | undefined {
    return this.eventsSubject.value.find(event => event.id === eventId);
  }

  setSelectedEvent(event: EventItem | null) {
    this.selectedEventSubject.next(event);
  }

  bookSeats(eventId: string, count: number): boolean {
    const events = this.getEvents().map(e => ({ ...e }));
    const idx = events.findIndex(e => e.id === eventId);
    if (idx === -1) return false;
    if (events[idx].ticketsLeft < count) return false;
    events[idx].ticketsLeft -= count;
    this.writeToStorage(events);
    return true;
  }
}
