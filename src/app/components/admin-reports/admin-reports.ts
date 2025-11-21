import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css'
})
export class AdminReportsComponent implements OnInit {
  auditoriumUsage: any;
  eventOccupancy: any;
  ticketSalesSummary: any;
  organizerPerformance: any;
  waitlistOverview: any;
  paymentSummary: any;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.auditoriumUsage = this.reportService.getAuditoriumUsage();
    this.eventOccupancy = this.reportService.getEventOccupancy();
    this.ticketSalesSummary = this.reportService.getTicketSalesSummary();
    this.organizerPerformance = this.reportService.getOrganizerPerformance();
    this.waitlistOverview = this.reportService.getWaitlistOverview();
    this.paymentSummary = this.reportService.getPaymentSummary();
  }

  exportToPdf(reportId: string) {
    // PDF export logic will be added here
    alert('Exporting ' + reportId + ' to PDF...');
  }
}
