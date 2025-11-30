import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Waitlist } from '../models/waitlist.model';
import { User } from '../models/user.model';

const WAITLIST_KEY = 'ticketing_waitlist_v1';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  private waitlistSubject = new BehaviorSubject<Waitlist[]>([]);
  public waitlist$ = this.waitlistSubject.asObservable();

  constructor() {
    this.waitlistSubject.next(this.readFromStorage());
  }

  private readFromStorage(): Waitlist[] {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return [];
      const raw = window.localStorage.getItem(WAITLIST_KEY);
      return raw ? JSON.parse(raw).map((w: any) => ({ ...w, joinedAt: new Date(w.joinedAt) })) : [];
    } catch {
      return [];
    }
  }

  private writeToStorage(waitlist: Waitlist[]): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(WAITLIST_KEY, JSON.stringify(waitlist));
      }
    } catch {}
    this.waitlistSubject.next(waitlist);
  }

  getWaitlistForUser(user: User): Observable<Waitlist[]> {
    return this.waitlist$.pipe(
      map(waitlist => waitlist.filter(w => w.attendeeEmail === user.email))
    );
  }

  addToWaitlist(eventId: string, user: User): Waitlist | null {
    const currentWaitlist = this.readFromStorage();
    
    // Prevent adding if user is already on the waitlist for this event
    const alreadyExists = currentWaitlist.some(w => w.eventId === eventId && w.attendeeEmail === user.email);
    if (alreadyExists) {
      return null;
    }

    const eventWaitlist = currentWaitlist.filter(w => w.eventId === eventId);
    const newPosition = eventWaitlist.length + 1;

    const newEntry: Waitlist = {
      waitlistId: `w-${Date.now()}`,
      eventId,
      attendeeName: user.fullName || 'N/A',
      attendeeEmail: user.email,
      position: newPosition,
      notified: false,
      joinedAt: new Date(),
    };

    const updatedWaitlist = [...currentWaitlist, newEntry];
    this.writeToStorage(updatedWaitlist);

    return newEntry;
  }

  removeFromWaitlist(waitlistId: string): void {
    const currentWaitlist = this.readFromStorage();
    const updatedWaitlist = currentWaitlist.filter(w => w.waitlistId !== waitlistId);
    this.writeToStorage(updatedWaitlist);
  }
}
