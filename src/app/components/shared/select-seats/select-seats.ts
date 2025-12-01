import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService} from '../../../services/auth.service';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { BookingService, Booking } from '../../../services/booking.service';
import { GenerateSeatsService } from '../../../services/generate-seats.service';
import { User } from '../../../models/user.model';



@Component({
    selector: 'app-select-seats',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './select-seats.html',
    styleUrls: ['./select-seats.css']
})
export class SelectSeatsComponent implements OnInit, OnDestroy {
    currentUser: User | null = null;
    sections: any[] = [];
    currentSectionIndex: number = 0;
    selectedSeats: any[] = [];
    booking: { fullName: string; email: string; performance: string } = { fullName: '', email: '', performance: '' };
    totalPrice: number = 0;
    selectedEvent: Event | null = null;
    private subs: Subscription[] = [];

    constructor(
        private auth: AuthService, 
        private eventsService: EventService, 
        private router: Router, 
        private bookingService: BookingService,
        private generateSeatsService: GenerateSeatsService
    ) {}

    ngOnInit(): void {
        // populate booking from logged-in user if available
        const user = this.auth.getUser();
        if (user) {
            if (user.fullName) this.booking.fullName = user.fullName;
            if (user.email) this.booking.email = user.email;
        }

        // subscribe to selected event
        const s = this.eventsService.selectedEvent$.subscribe(ev => {
            this.selectedEvent = ev;
            if (ev) {
                this.booking.performance = `${ev.title} — ${new Date(ev.date).toLocaleDateString()} ${ev.startTime}`;
            }
        });
        this.subs.push(s);
        // if no selected event, redirect back to browse
        if (!this.selectedEvent) {
            this.router.navigateByUrl('/browse-events');
            return;
        }
        this.sections = this.generateSeatsService.generateSeats();
    }


    changeSection(index: number): void {
        this.currentSectionIndex = index;
    }

    selectSeat(seat: any): void {
        if (seat.occupied) return;

        if (seat.selected) {
            seat.selected = false;
            this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
        } else {
            seat.selected = true;
            this.selectedSeats.push(seat);
        }
        this.updateTotalPrice();
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    updateTotalPrice(): void {
        this.totalPrice = this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
    }

    confirmBooking(): void {
        if (this.selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }
        // If there's a selected event, attempt to book seats 
        if (!this.selectedEvent) {
            alert('No event selected. Please choose an event first.');
            this.router.navigateByUrl('/browse-events');
            return;
        }

        // Create a pending booking and move to promo code step
        const seats = this.selectedSeats.map(seat => ({ number: seat.number, seatType: seat.seatType }));
        const booking: Booking = {
            id: String(Date.now()),
            userId: this.auth.getUser()?.userId,
            fullName: this.booking.fullName,
            email: this.booking.email,
            eventId: this.selectedEvent.eventId,
            eventName: this.selectedEvent.title,
            seats: seats,
            subtotal: this.totalPrice,
            promoCode: null,
            discount: 0,
            finalPrice: this.totalPrice,
            status: 'pending',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.bookingService.setCurrent(booking);
        // navigate to promo-code page to allow discount application
        this.router.navigateByUrl('/promo-code');
    }

    ngOnDestroy(): void {
        this.subs.forEach(s => s.unsubscribe());
    }
}