import { Component } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-organizer-create-event',
  imports: [RouterLink],
  templateUrl: './organizer-create-event.html',
  styleUrl: './organizer-create-event.css',
})
export class OrganizerCreateEventComponent {
  
  constructor(private router: Router) {}

  onEventSubmit() {
    alert('Event created successfully!');
    this.router.navigate(['/dashboard']); // or ['dashboard']
  }
}