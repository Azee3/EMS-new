import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking.model';


const BOOKINGS_KEY = 'ticketing_bookings_v1';
const CURRENT_KEY = 'ticketing_current_booking';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>(this.readBookings());
  public bookings$ = this.bookingsSubject.asObservable();

  private currentSubject = new BehaviorSubject<Booking | null>(this.readCurrent());
  public current$ = this.currentSubject.asObservable();

  constructor() {}

  private readBookings(): Booking[] {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return [];
      const raw = window.localStorage.getItem(BOOKINGS_KEY);
      return raw ? (JSON.parse(raw) as Booking[]) : [];
    } catch {
      return [];
    }
  }

  private writeBookings(list: Booking[]) {
    try {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
      }
    } catch {}
    this.bookingsSubject.next(list);
  }

  private readCurrent(): Booking | null {
    try {
      if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null;
      const raw = window.localStorage.getItem(CURRENT_KEY);
      return raw ? (JSON.parse(raw) as Booking) : null;
    } catch {
      return null;
    }
  }

  private writeCurrent(b: Booking | null) {
    try {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        if (b) window.localStorage.setItem(CURRENT_KEY, JSON.stringify(b));
        else window.localStorage.removeItem(CURRENT_KEY);
      }
    } catch {}
    this.currentSubject.next(b);
  }

  setCurrent(booking: Booking) {
    this.writeCurrent(booking);
  }

  getCurrent(): Booking | null {
    return this.currentSubject.value;
  }

  clearCurrent() {
    this.writeCurrent(null);
  }

  saveBooking(booking: Booking) {
    const list = this.readBookings();
    const now = new Date().toISOString();
    booking.updatedAt = now;
    if (!booking.createdAt) booking.createdAt = now;
    const idx = list.findIndex(b => b.id === booking.id);
    if (idx === -1) list.push(booking);
    else list[idx] = booking;
    this.writeBookings(list);
  }

  finalizeBooking(booking: Booking) {
    booking.status = 'paid';
    booking.updatedAt = new Date().toISOString();
    this.saveBooking(booking);
    // clear current booking
    this.clearCurrent();
  }
}
