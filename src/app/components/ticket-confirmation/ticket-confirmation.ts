import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService, Booking } from '../../services/booking.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-confirmation.html',
  styleUrls: ['./ticket-confirmation.css']
})
export class TicketConfirmationComponent implements OnDestroy {
  ticketDetails: any = null;
  sub: Subscription | null = null;

  constructor(private bookingService: BookingService) {
    this.sub = this.bookingService.bookings$.subscribe(list => {
      if (list && list.length) {
        const last = list[list.length - 1];
        this.ticketDetails = {
          eventName: last.eventName,
          bookingId : last.id,
          seats: last.seats || [],
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(last.id)}`
        };
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  emailTicket() {
    alert('Ticket has been sent to your email!');
  }
}
