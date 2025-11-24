import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-organizer-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './organizer-home.html',
  styleUrl: './organizer-home.css',
})
export class OrganizerHome {
  constructor(public auth: AuthService) {}
  
    get currentUser() {
      return this.auth.getUser();
    }
}
