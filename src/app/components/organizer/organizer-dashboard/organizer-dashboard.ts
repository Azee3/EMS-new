import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { RouterLink } from '@angular/router';

interface SummaryData {
  activeEvents: { value: number; footer: string };
  ticketsSold: { value: string; footer: string };
  totalRevenue: { value: string; footer: string };
  avgOccupancy: { value: string; footer: string };
}

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './organizer-dashboard.html',
  styleUrls: ['./organizer-dashboard.css']
})
export class OrganizerDashboardComponent implements OnInit, AfterViewInit {
  currentPage = 'dashboard';
  activeFilter: 'last7days' | 'last30days' | 'allTime' = 'last30days';

  summaryData: SummaryData;
  salesChart: Chart | undefined;
  revenueChart: Chart | undefined;
  occupancyChart: Chart | undefined;

  private mockData = {
    last7days: {
      summary: {
        activeEvents: { value: 2, footer: '1 event this week' },
        ticketsSold: { value: '124', footer: '+124 this week' },
        totalRevenue: { value: '$2,450', footer: '+$2,450 this week' },
        avgOccupancy: { value: '78%', footer: '+2% from last week' }
      },
      charts: {
        sales: { labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], data: [10, 25, 40, 30, 55, 60, 124] },
        revenue: { labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], data: [200, 500, 800, 600, 1100, 1200, 2450] },
        occupancy: { labels: ['Event A', 'Event B'], data: [75, 81] }
      }
    },
    last30days: {
      summary: {
        activeEvents: { value: 8, footer: '3 events this month' },
        ticketsSold: { value: '1,248', footer: '+124 this week' },
        totalRevenue: { value: '$24,580', footer: '+$2,450 this month' },
        avgOccupancy: { value: '84%', footer: '+5% from last month' }
      },
      charts: {
        sales: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [300, 450, 250, 248] },
        revenue: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [6000, 9000, 5000, 4580] },
        occupancy: { labels: ['Event A', 'Event B', 'Event C', 'Event D'], data: [85, 90, 78, 82] }
      }
    },
    allTime: {
      summary: {
        activeEvents: { value: 25, footer: 'Total events hosted' },
        ticketsSold: { value: '15,820', footer: 'Since inception' },
        totalRevenue: { value: '$315,200', footer: 'Total revenue generated' },
        avgOccupancy: { value: '81%', footer: 'Overall average' }
      },
      charts: {
        sales: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], data: [4000, 5000, 3820, 3000] },
        revenue: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], data: [80000, 100000, 75200, 60000] },
        occupancy: { labels: ['2023', '2024', '2025'], data: [79, 83, 81] }
      }
    }
  };

  constructor() {
    this.summaryData = this.mockData[this.activeFilter].summary;
  }

  ngOnInit() {
    this.updateDashboardData();
  }

  ngAfterViewInit() {
    this.createCharts();
  }

  setFilter(filter: 'last7days' | 'last30days' | 'allTime') {
    this.activeFilter = filter;
    this.updateDashboardData();
  }

  updateDashboardData() {
    this.summaryData = this.mockData[this.activeFilter].summary;
    this.updateCharts();
  }
  
  createCharts() {
    const salesData = this.mockData[this.activeFilter].charts.sales;
    this.createSalesChart(salesData.labels, salesData.data);

    const revenueData = this.mockData[this.activeFilter].charts.revenue;
    this.createRevenueChart(revenueData.labels, revenueData.data);
    
    const occupancyData = this.mockData[this.activeFilter].charts.occupancy;
    this.createOccupancyChart(occupancyData.labels, occupancyData.data);
  }

  updateCharts() {
    const salesData = this.mockData[this.activeFilter].charts.sales;
    if (this.salesChart) {
      this.salesChart.data.labels = salesData.labels;
      this.salesChart.data.datasets[0].data = salesData.data;
      this.salesChart.update();
    }

    const revenueData = this.mockData[this.activeFilter].charts.revenue;
    if (this.revenueChart) {
      this.revenueChart.data.labels = revenueData.labels;
      this.revenueChart.data.datasets[0].data = revenueData.data;
      this.revenueChart.update();
    }

    const occupancyData = this.mockData[this.activeFilter].charts.occupancy;
    if (this.occupancyChart) {
      this.occupancyChart.data.labels = occupancyData.labels;
      this.occupancyChart.data.datasets[0].data = occupancyData.data;
      this.occupancyChart.update();
    }
  }

  createSalesChart(labels: string[], data: number[]) {
    const canvas = document.getElementById('sales-chart') as HTMLCanvasElement;
    if (canvas) {
      this.salesChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Tickets Sold',
            data: data,
            borderColor: 'rgba(239, 83, 80, 1)',
            backgroundColor: 'rgba(239, 83, 80, 0.2)',
            fill: true,
            tension: 0.4
          }]
        }
      });
    }
  }

  createRevenueChart(labels: string[], data: number[]) {
    const canvas = document.getElementById('revenue-chart') as HTMLCanvasElement;
    if (canvas) {
      this.revenueChart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Revenue',
            data: data,
            backgroundColor: 'rgba(239, 83, 80, 0.8)',
            borderColor: 'rgba(239, 83, 80, 1)',
            borderWidth: 1
          }]
        }
      });
    }
  }
  
  createOccupancyChart(labels: string[], data: number[]) {
    const canvas = document.getElementById('occupancy-chart') as HTMLCanvasElement;
    if (canvas) {
      this.occupancyChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Avg. Occupancy',
            data: data,
            backgroundColor: [
              'rgba(239, 83, 80, 0.8)',
              'rgba(255, 205, 210, 0.8)',
              'rgba(229, 115, 115, 0.8)',
              'rgba(239, 154, 154, 0.8)'
            ],
          }]
        }
      });
    }
  }

  showPage(page: string) {
    this.currentPage = page;
  }

  onEventSubmit() {
    alert('Event created successfully!');
    this.showPage('dashboard');
  }
}
