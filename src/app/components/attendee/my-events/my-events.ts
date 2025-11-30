import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService} from '../../../services/auth.service';
import { Booking, BookingService } from '../../../services/booking.service';
import { Event } from '../../../models/event.model';
import { Waitlist } from '../../../models/waitlist.model';
import { EventService } from '../../../services/event.service';
import { WaitlistService } from '../../../services/waitlist.service';
import { Observable, of, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import  {User } from '../../../models/user.model';


interface BookingWithEvent extends Booking {
  event: Event | undefined;
}

interface WaitlistWithEvent extends Waitlist {
  event: Event | undefined;
}

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-events.html',
  styleUrls: ['./my-events.css'],
})
export class MyEventsComponent implements OnInit {
  activeView: 'upcoming' | 'history' | 'waitlist' = 'upcoming';

  upcomingBookings$: Observable<BookingWithEvent[]> | undefined;
  pastBookings$: Observable<BookingWithEvent[]> | undefined;
  userWaitlists$: Observable<WaitlistWithEvent[]> | undefined;

  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private eventService: EventService,
    private waitlistService: WaitlistService
  ) {}

  ngOnInit(): void {
    const currentUser: User | null = this.authService.getUser();
    if (currentUser) {
      const userBookings$ = combineLatest([
        this.bookingService.bookings$,
        this.eventService.events$
      ]).pipe(
        map(([bookings, events]) => {
          const userBookings = bookings.filter(b => b.userId === currentUser.userId);
          return userBookings.map(booking => ({
            ...booking,
            event: events.find(e => e.eventId === booking.eventId),
          }));
        })
      );

      this.upcomingBookings$ = userBookings$.pipe(
        map(bookings => bookings.filter(b => b.event?.status === 'upcoming' || b.event?.status === 'ongoing'))
      );

      this.pastBookings$ = userBookings$.pipe(
        map(bookings => bookings.filter(b => b.event?.status === 'past' || b.event?.status === 'cancelled'))
      );

      this.userWaitlists$ = combineLatest([
        this.waitlistService.getWaitlistForUser(currentUser),
        this.eventService.events$
      ]).pipe(
        map(([waitlists, events]) => {
          return waitlists.map(waitlistEntry => ({
            ...waitlistEntry,
            event: events.find(e => e.eventId === waitlistEntry.eventId),
          }) as WaitlistWithEvent);
        })
      );
    }
  }

  setView(view: 'upcoming' | 'history' | 'waitlist'): void {
    this.activeView = view;
  }

  exitWaitlist(waitlistId: string): void {
    this.waitlistService.removeFromWaitlist(waitlistId);
  }
}