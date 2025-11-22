import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-seat-selection',
  imports: [RouterLink],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css',
})

  export class SeatSelectionComponent {
  
  selectedSeats: string[] = [];
  seatStatus: { [key: string]: string } = {}; // 'available', 'selected', 'occupied'

  onSeatClick(seatId: string) {
    if (this.seatStatus[seatId] === 'occupied') {
      return; // Can't select occupied seats
    }

    const index = this.selectedSeats.indexOf(seatId);
    if (index > -1) {
      // Deselect
      this.selectedSeats.splice(index, 1);
      this.seatStatus[seatId] = 'available';
    } else {
      // Select
      this.selectedSeats.push(seatId);
      this.seatStatus[seatId] = 'selected';
    }
  }

  getSeatClass(seatId: string): string {
    return `seat-circle ${this.seatStatus[seatId] || 'available'}`;
  }

}

