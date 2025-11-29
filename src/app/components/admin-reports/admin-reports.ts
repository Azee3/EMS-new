import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrls: ['./admin-reports.css'],
})
export class AdminReportsComponent implements OnInit, AfterViewInit {
  activeFilter: 'last7days' | 'last30days' | 'allTime' = 'last30days';

  auditoriumUsage: any;
  eventOccupancy: any;
  ticketSalesSummary: any;
  organizerPerformance: any;
  waitlistOverview: any;
  paymentSummary: any;
  
  eventOccupancyChart: Chart | undefined;
  ticketSalesSummaryChart: Chart | undefined;
  paymentSummaryChart: Chart | undefined;

  private mockData = {
    last7days: {
      auditoriumUsage: { usageFrequency: 'High', bookedDays: 6, freeDays: 1 },
      eventOccupancy: [{ eventName: 'Event A', soldSeats: 150, totalSeats: 200 }],
      ticketSalesSummary: { totalTicketsSold: 150, totalRevenue: 3750, highestSellingEvent: { eventName: 'Event A', ticketsSold: 150 }, lowestPerformingEvent: { eventName: 'Event A', ticketsSold: 150 } },
      organizerPerformance: [{ organizerName: 'Org 1', eventsCreated: 1 }],
      waitlistOverview: { eventsWithWaitlists: 1, totalWaitlistEntries: 20, attendeesStillWaiting: 5 },
      paymentSummary: { totalRevenue: 3750, successfulPayments: 50, revenueTrend: [{ month: 'Day 1', revenue: 500 }, { month: 'Day 7', revenue: 3250 }] }
    },
    last30days: {
      auditoriumUsage: { usageFrequency: 'Very High', bookedDays: 25, freeDays: 5 },
      eventOccupancy: [
        { eventName: 'Event A', soldSeats: 450, totalSeats: 500 },
        { eventName: 'Event B', soldSeats: 300, totalSeats: 400 },
        { eventName: 'Event C', soldSeats: 600, totalSeats: 600 }
      ],
      ticketSalesSummary: { totalTicketsSold: 1350, totalRevenue: 33750, highestSellingEvent: { eventName: 'Event C', ticketsSold: 600 }, lowestPerformingEvent: { eventName: 'Event B', ticketsSold: 300 } },
      organizerPerformance: [{ organizerName: 'Org 1', eventsCreated: 2 }, { organizerName: 'Org 2', eventsCreated: 1 }],
      waitlistOverview: { eventsWithWaitlists: 2, totalWaitlistEntries: 80, attendeesStillWaiting: 15 },
      paymentSummary: { totalRevenue: 33750, successfulPayments: 450, revenueTrend: [{ month: 'Week 1', revenue: 8000 }, { month: 'Week 4', revenue: 12000 }] }
    },
    allTime: {
      auditoriumUsage: { usageFrequency: 'Constant', bookedDays: 300, freeDays: 65 },
      eventOccupancy: [
        { eventName: 'Historic A', soldSeats: 5000, totalSeats: 5500 },
        { eventName: 'Historic B', soldSeats: 8000, totalSeats: 8000 },
        { eventName: 'Historic C', soldSeats: 4000, totalSeats: 6000 }
      ],
      ticketSalesSummary: { totalTicketsSold: 17000, totalRevenue: 425000, highestSellingEvent: { eventName: 'Historic B', ticketsSold: 8000 }, lowestPerformingEvent: { eventName: 'Historic C', ticketsSold: 4000 } },
      organizerPerformance: [{ organizerName: 'Org 1', eventsCreated: 10 }, { organizerName: 'Org 2', eventsCreated: 8 }, { organizerName: 'Org 3', eventsCreated: 5 }],
      waitlistOverview: { eventsWithWaitlists: 15, totalWaitlistEntries: 500, attendeesStillWaiting: 50 },
      paymentSummary: { totalRevenue: 425000, successfulPayments: 15000, revenueTrend: [{ month: '2023', revenue: 150000 }, { month: '2024', revenue: 275000 }] }
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.updateData();
  }

  ngAfterViewInit(): void {
    this.createCharts();
  }
  
  setFilter(filter: 'last7days' | 'last30days' | 'allTime') {
    this.activeFilter = filter;
    this.updateData();
  }

  updateData() {
    const data = this.mockData[this.activeFilter];
    this.auditoriumUsage = data.auditoriumUsage;
    this.eventOccupancy = data.eventOccupancy;
    this.ticketSalesSummary = data.ticketSalesSummary;
    this.organizerPerformance = data.organizerPerformance;
    this.waitlistOverview = data.waitlistOverview;
    this.paymentSummary = data.paymentSummary;

    this.updateCharts();
  }

  createCharts() {
    this.renderEventOccupancyChart();
    this.renderTicketSalesSummaryChart();
    this.renderPaymentSummaryChart();
  }

  updateCharts() {
    this.renderEventOccupancyChart();
    this.renderTicketSalesSummaryChart();
    this.renderPaymentSummaryChart();
  }

  renderEventOccupancyChart(): void {
    if (this.eventOccupancy && this.eventOccupancy.length > 0) {
      const labels = this.eventOccupancy.map((event: any) => event.eventName);
      const soldSeats = this.eventOccupancy.map((event: any) => event.soldSeats);
      const totalSeats = this.eventOccupancy.map((event: any) => event.totalSeats);

      if (this.eventOccupancyChart) {
        this.eventOccupancyChart.data.labels = labels;
        this.eventOccupancyChart.data.datasets[0].data = soldSeats;
        this.eventOccupancyChart.data.datasets[1].data = totalSeats;
        this.eventOccupancyChart.update();
      } else {
        this.eventOccupancyChart = new Chart('eventOccupancyChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              { label: 'Sold Seats', data: soldSeats, backgroundColor: 'rgba(75, 192, 192, 0.6)' },
              { label: 'Total Seats', data: totalSeats, backgroundColor: 'rgba(153, 102, 255, 0.6)' },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
        });
      }
    }
  }

  renderTicketSalesSummaryChart(): void {
    if (this.ticketSalesSummary) {
      const labels = [this.ticketSalesSummary.highestSellingEvent.eventName, this.ticketSalesSummary.lowestPerformingEvent.eventName];
      const data = [this.ticketSalesSummary.highestSellingEvent.ticketsSold, this.ticketSalesSummary.lowestPerformingEvent.ticketsSold];

      if (this.ticketSalesSummaryChart) {
        this.ticketSalesSummaryChart.data.labels = labels;
        this.ticketSalesSummaryChart.data.datasets[0].data = data;
        this.ticketSalesSummaryChart.update();
      } else {
        this.ticketSalesSummaryChart = new Chart('ticketSalesSummaryChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Tickets Sold',
              data: data,
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            }],
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
        });
      }
    }
  }

  renderPaymentSummaryChart(): void {
    if (this.paymentSummary && this.paymentSummary.revenueTrend) {
      const labels = this.paymentSummary.revenueTrend.map((trend: any) => trend.month);
      const data = this.paymentSummary.revenueTrend.map((trend: any) => trend.revenue);

      if (this.paymentSummaryChart) {
        this.paymentSummaryChart.data.labels = labels;
        this.paymentSummaryChart.data.datasets[0].data = data;
        this.paymentSummaryChart.update();
      } else {
        this.paymentSummaryChart = new Chart('paymentSummaryChart', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenue Trend',
              data: data,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
            }],
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } },
        });
      }
    }
  }

  exportToPdf(reportId: string) {
    alert('Exporting ' + reportId + ' to PDF...');
  }
}
