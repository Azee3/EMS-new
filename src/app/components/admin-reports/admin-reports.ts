import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/admin-report.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css',
})
export class AdminReportsComponent implements OnInit {
  auditoriumUsage: any;
  eventOccupancy: any;
  ticketSalesSummary: any;
  organizerPerformance: any;
  waitlistOverview: any;
  paymentSummary: any;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.auditoriumUsage = this.reportService.getAuditoriumUsage();
    this.eventOccupancy = this.reportService.getEventOccupancy();
    this.ticketSalesSummary = this.reportService.getTicketSalesSummary();
    this.organizerPerformance = this.reportService.getOrganizerPerformance();
    this.waitlistOverview = this.reportService.getWaitlistOverview();
    this.paymentSummary = this.reportService.getPaymentSummary();
  }

  ngAfterViewInit(): void {
    this.renderEventOccupancyChart();
    this.renderTicketSalesSummaryChart();
    this.renderPaymentSummaryChart();
  }

  renderEventOccupancyChart(): void {
    if (this.eventOccupancy && this.eventOccupancy.length > 0) {
      const labels = this.eventOccupancy.map((event: any) => event.eventName);
      const soldSeats = this.eventOccupancy.map((event: any) => event.soldSeats);
      const totalSeats = this.eventOccupancy.map((event: any) => event.totalSeats);

      new Chart('eventOccupancyChart', {
        type: 'bar',
        data: {
          labels: ["Event 1", "Event 2", "Event 3" ],
          datasets: [
            {
              label: 'Sold Seats',
              data: soldSeats,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Total Seats',
              data: totalSeats,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  public chartOptions: any = {
    scales: {
      x: {
        display: true, // Keep the axis line visible
        ticks: {
          display: false, // Hide only the labels
        },
        grid: {
          display: false, // Optional: hide grid lines for x-axis
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  renderTicketSalesSummaryChart(): void {
    if (this.ticketSalesSummary) {
      const labels = [
        this.ticketSalesSummary.highestSellingEvent.eventId,
        this.ticketSalesSummary.lowestPerformingEvent.eventId,
      ];
      const data = [
        this.ticketSalesSummary.highestSellingEvent.ticketsSold,
        this.ticketSalesSummary.lowestPerformingEvent.ticketsSold,
      ];

      new Chart('ticketSalesSummaryChart', {
        type: 'bar',
        data: {
          labels: ["Highest Selling", "Lowest Selling"],
          datasets: [
            {
              label: 'Tickets Sold',
              data: data,
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  renderPaymentSummaryChart(): void {
    if (this.paymentSummary && this.paymentSummary.revenueTrend) {
      const labels = this.paymentSummary.revenueTrend.map((trend: any) => trend.month);
      const data = this.paymentSummary.revenueTrend.map((trend: any) => trend.revenue);

      new Chart('paymentSummaryChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Revenue Trend',
              data: data,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  exportToPdf(reportId: string) {
    // PDF export logic will be added here
    alert('Exporting ' + reportId + ' to PDF...');
  }
}
