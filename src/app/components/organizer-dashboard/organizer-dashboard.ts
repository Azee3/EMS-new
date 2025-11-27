import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/admin-report.service';
import Chart from 'chart.js/auto';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './organizer-dashboard.html',
  styleUrl: './organizer-dashboard.css'
})
export class OrganizerDashboardComponent  {
  currentPage = 'dashboard';

  showPage(page: string) {
    this.currentPage = page;
  }

  onEventSubmit() {
    alert('Event created successfully!');
    this.showPage('dashboard');
  }
}
