import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class AdminHomeComponent implements OnInit, AfterViewInit, OnDestroy {
  dashboardStats: any;
  bestPerformingEvents: any;
  salesOverview: any;
  occupancyRates: any;
  selectedPeriod: string = '7d';

  private salesChart: Chart | undefined;
  private occupancyChart: Chart | undefined;

  private mockData: any = {
    '7d': {
      dashboardStats: { totalEvents: 5, activeOrganizers: 10, ticketsSold: 1500, revenue: 75000 },
      bestPerformingEvents: { eventName: 'Weekly Tech Meetup', ticketsSold: 500 },
      salesOverview: [
        { month: 'Day 1', revenue: 10000 },
        { month: 'Day 2', revenue: 12000 },
        { month: 'Day 3', revenue: 8000 },
        { month: 'Day 4', revenue: 15000 },
        { month: 'Day 5', revenue: 13000 },
        { month: 'Day 6', revenue: 17000 },
        { month: 'Day 7', revenue: 20000 },
      ],
      occupancyRates: [
        { eventName: 'Tech Meetup', soldSeats: 500 },
        { eventName: 'Music Fest', soldSeats: 400 },
        { eventName: 'Art Show', soldSeats: 300 },
        { eventName: 'Food Expo', soldSeats: 200 },
        { eventName: 'Gaming Con', soldSeats: 100 },
      ],
    },
    '30d': {
      dashboardStats: { totalEvents: 20, activeOrganizers: 25, ticketsSold: 6000, revenue: 300000 },
      bestPerformingEvents: { eventName: 'Monthly Music Festival', ticketsSold: 2000 },
      salesOverview: [
        { month: 'Week 1', revenue: 75000 },
        { month: 'Week 2', revenue: 85000 },
        { month: 'Week 3', revenue: 65000 },
        { month: 'Week 4', revenue: 75000 },
      ],
      occupancyRates: [
        { eventName: 'Music Festival', soldSeats: 2000 },
        { eventName: 'Job Fair', soldSeats: 1500 },
        { eventName: 'Product Launch', soldSeats: 1000 },
        { eventName: 'Charity Gala', soldSeats: 800 },
        { eventName :'Coding Bootcamp', soldSeats: 700 },
      ],
    },
    '90d': {
      dashboardStats: { totalEvents: 60, activeOrganizers: 40, ticketsSold: 18000, revenue: 900000 },
      bestPerformingEvents: { eventName: 'Quarterly Business Summit', ticketsSold: 5000 },
      salesOverview: [
        { month: 'Month 1', revenue: 300000 },
        { month: 'Month 2', revenue: 350000 },
        { month: 'Month 3', revenue: 250000 },
      ],
      occupancyRates: [
        { eventName: 'Business Summit', soldSeats: 5000 },
        { eventName: 'Developer Conference', soldSeats: 4500 },
        { eventName: 'Startup Pitch Day', soldSeats: 4000 },
        { eventName: 'Marketing Expo', soldSeats: 2500 },
        { eventName: 'Health & Wellness Fair', soldSeats: 2000 },
      ],
    },
  };

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.setPeriod('7d');
  }

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  ngOnDestroy(): void {
    this.destroyCharts();
  }

  setPeriod(period: '7d' | '30d' | '90d'): void {
    this.selectedPeriod = period;
    const data = this.mockData[period];
    this.dashboardStats = data.dashboardStats;
    this.bestPerformingEvents = data.bestPerformingEvents;
    this.salesOverview = data.salesOverview;
    this.occupancyRates = data.occupancyRates;

    this.renderCharts();
  }

  get currentUser() {
    return this.auth.getUser();
  }

  private destroyCharts(): void {
    if (this.salesChart) {
      this.salesChart.destroy();
      this.salesChart = undefined;
    }
    if (this.occupancyChart) {
      this.occupancyChart.destroy();
      this.occupancyChart = undefined;
    }
  }

  renderCharts(): void {
    this.destroyCharts();
    
    if (this.salesOverview && this.salesOverview.length > 0) {
      const salesLabels = this.salesOverview.map((item: any) => item.month);
      const salesData = this.salesOverview.map((item: any) => item.revenue);

      this.salesChart = new Chart('salesOverviewChart', {
        type: 'line',
        data: {
          labels: salesLabels,
          datasets: [{
            label: 'Revenue',
            data: salesData,
            borderColor: '#b70122',
            backgroundColor: 'rgba(183, 1, 34, 0.1)',
            fill: true,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }

    if (this.occupancyRates && this.occupancyRates.length > 0) {
      const occupancyLabels = this.occupancyRates.map((event: any) => event.eventName);
      const occupancyData = this.occupancyRates.map((event: any) => event.soldSeats);

      this.occupancyChart = new Chart('occupancyRatesChart', {
        type: 'doughnut',
        data: {
          labels: occupancyLabels,
          datasets: [{
            label: 'Tickets Sold',
            data: occupancyData,
            backgroundColor: ['#b70122', '#2c3e50', '#2ecc71', '#f39c12', '#e74c3c', '#3498db'],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
}
