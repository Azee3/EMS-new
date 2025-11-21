import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { EventService, EventItem } from '../../services/event.service';

@Component({
  selector: 'app-browse-events',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './browse-events.html',
  styleUrls: ['./browse-events.css']
})
export class BrowseEventsComponent {
  events: EventItem[] = [];

  constructor(private eventsService: EventService, private router: Router) {
    this.eventsService.events$.subscribe(e => this.events = e);
  }

  book(event: EventItem) {
    // set selected event in service, then navigate
    this.eventsService.setSelectedEvent(event);
    this.router.navigateByUrl('/select-seats');
  }
}
