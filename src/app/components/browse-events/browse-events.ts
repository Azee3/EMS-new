import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { WaitlistService } from '../../services/waitlist.service';
import { Waitlist } from '../../models/waitlist.model';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse-events.html',
  styleUrls: ['./browse-events.css']
})
export class BrowseEventsComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  userWaitlists: Waitlist[] = [];
  private waitlistSub: Subscription | undefined;

  constructor(
    private eventsService: EventService,
    private router: Router,
    private waitlistService: WaitlistService,
    private authService: AuthService
    ) {
    this.eventsService.events$.subscribe(e => this.events = e);
  }

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (user) {
      this.waitlistSub = this.waitlistService.getWaitlistForUser(user).subscribe(waitlists => {
        this.userWaitlists = waitlists;
      });
    }
  }

  ngOnDestroy(): void {
    this.waitlistSub?.unsubscribe();
  }

  book(event: Event) {
    // set selected event in service, then navigate
    this.eventsService.setSelectedEvent(event);
    this.router.navigateByUrl('/select-seats');
  }

  joinWaitlist(event: Event) {
    const user = this.authService.getUser();
    if (!user) {
      alert('Please log in to join the waitlist.');
      this.router.navigateByUrl('/login');
      return;
    }

    const result = this.waitlistService.addToWaitlist(event.eventId, user);
    if (result) {
      alert(`You have been added to the waitlist for ${event.title}! Your position is ${result.position}.`);
    } else {
      alert(`You are already on the waitlist for ${event.title}.`);
    }
  }

  isOnWaitlist(event: Event): boolean {
    if (!this.userWaitlists) return false;
    return this.userWaitlists.some(w => w.eventId === event.eventId);
  }
}
