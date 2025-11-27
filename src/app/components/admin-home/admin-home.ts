import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ReportService } from '../../services/admin-report.service';


import Chart from 'chart.js/auto';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class AdminHomeComponent implements OnInit, AfterViewInit {
  
  dashboardStats: any;
  bestPerformingEvents: any;
  salesOverview: any;
  occupancyRates: any;

  constructor(
    public auth: AuthService,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    const salesSummary = this.reportService.getTicketSalesSummary();
    const organizerPerformance = this.reportService.getOrganizerPerformance();
    const events = this.reportService.getEventOccupancy();

    this.dashboardStats = {
      totalEvents: events.length,
      activeOrganizers: organizerPerformance.length,
      ticketsSold: salesSummary.totalTicketsSold,
      revenue: salesSummary.totalRevenue
    };

    this.bestPerformingEvents = salesSummary.highestSellingEvent;
    
    // For charts
    this.salesOverview = this.reportService.getPaymentSummary().revenueTrend;
    this.occupancyRates = this.reportService.getEventOccupancy();
  }

  ngAfterViewInit(): void {
    this.renderSalesChart();
    this.renderOccupancyChart();
  }

  get currentUser() {
    return this.auth.getUser();
  }

  renderSalesChart(): void {
    if (this.salesOverview && this.salesOverview.length > 0) {
      const labels = this.salesOverview.map((item: any) => item.month);
      const data = this.salesOverview.map((item: any) => item.revenue);

      new Chart('salesOverviewChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Revenue',
            data: data,
            borderColor: '#b70122',
            backgroundColor: 'rgba(183, 1, 34, 0.1)',
            fill: true,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  }

  renderOccupancyChart(): void {
    if (this.occupancyRates && this.occupancyRates.length > 0) {
      const labels = this.occupancyRates.map((event: any) => event.eventName);
      const data = this.occupancyRates.map((event: any) => event.soldSeats);

      new Chart('occupancyRatesChart', {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Tickets Sold',
            data: data,
            backgroundColor: [
              '#b70122', '#2c3e50', '#2ecc71', '#f39c12', '#e74c3c', '#3498db'
            ],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    }
  }
}
