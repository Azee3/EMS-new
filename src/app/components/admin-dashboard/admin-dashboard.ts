import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AdminDashboardComponent {
  constructor(public auth: AuthService) {}

  get currentUser() {
    return this.auth.getUser();
  }
}
