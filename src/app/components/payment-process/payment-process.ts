import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-payment-process',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment-process.html',
  styleUrls: ['./payment-process.css']
})
export class PaymentProcessComponent {
  paymentMethod: string = 'credit-card';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  walletProvider: string = 'paypal';

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private eventService: EventService
  ) {}

  processPayment() {
    const booking = this.bookingService.getCurrent();
    if (!booking) {
      alert('No booking found to pay for.');
      return;
    }

    // Simulate payment processing (would call real payment API in production)
    const seatsCount = booking.seats ? booking.seats.length : 1;
    const success = this.eventService.bookSeats(booking.eventId, seatsCount);
    if (!success) {
      alert('Payment failed: not enough seats available.');
      return;
    }

    // Mark booking as paid and persist
    this.bookingService.finalizeBooking(booking);

    // Navigate to confirmation
    this.router.navigate(['/ticket-confirmation']);
  }
}
