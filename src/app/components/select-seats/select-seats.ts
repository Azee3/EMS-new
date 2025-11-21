import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EventService, EventItem } from '../../services/event.service';
import { BookingService, Booking } from '../../services/booking.service';

@Component({
    selector: 'app-select-seats',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './select-seats.html',
    styleUrls: ['./select-seats.css']
})
export class SelectSeatsComponent implements OnInit, OnDestroy {
    balconyRows: any[] = [];
    lowerFoyerRows: any[] = [];
    selectedSeats: any[] = [];
    booking: { fullName: string; email: string; phone?: string; performance: string } = { fullName: '', email: '', performance: '' };
    totalPrice: number = 0;
    selectedEvent: EventItem | null = null;
    private subs: Subscription[] = [];

    constructor(private auth: AuthService, private eventsService: EventService, private router: Router, private bookingService: BookingService) {}

    ngOnInit(): void {
        // populate booking from logged-in user if available
        const user = this.auth.getUser();
        if (user) {
            if (user.fullName) this.booking.fullName = user.fullName;
            if (user.email) this.booking.email = user.email;
            if (user.phone) this.booking.phone = user.phone;
        }

        // subscribe to selected event
        const s = this.eventsService.selectedEvent$.subscribe(ev => {
            this.selectedEvent = ev;
            if (ev) {
                this.booking.performance = `${ev.name} — ${ev.date} ${ev.time}`;
            }
        });
        this.subs.push(s);
        // if no selected event, redirect back to browse
        if (!this.selectedEvent) {
            this.router.navigateByUrl('/browse-events');
            return;
        }
        // Generate balcony rows
        this.balconyRows = [];
        for (let i = 1; i <= 4; i++) {
            const row: any[] = [];
            for (let j = 1; j <= 8; j++) {
                row.push({
                    number: `B${i}-${j}`,
                    section: 'Balcony',
                    selected: false,
                    occupied: Math.random() > 0.8 // 20% chance a seat is occupied
                });
            }
            this.balconyRows.push(row);
        }

        // Generate lower foyer rows
        this.lowerFoyerRows = [];
        for (let i = 1; i <= 6; i++) {
            const row: any[] = [];
            for (let j = 1; j <= 10; j++) {
                row.push({
                    number: `LF${i}-${j}`,
                    section: 'Lower Foyer',
                    selected: false,
                    occupied: Math.random() > 0.8 // 20% chance a seat is occupied
                });
            }
            this.lowerFoyerRows.push(row);
        }
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

    getPrice(seat: any): number {
        if (seat.section === 'Balcony') {
            return 45;
        } else if (seat.section === 'Lower Foyer') {
            return 65;
        }
        return 0;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    updateTotalPrice(): void {
        this.totalPrice = this.selectedSeats.reduce((total, seat) => total + this.getPrice(seat), 0);
    }

    confirmBooking(): void {
        if (this.selectedSeats.length === 0) {
            alert('Please select at least one seat.');
            return;
        }
        // If there's a selected event, attempt to book seats (decrement available tickets)
        if (!this.selectedEvent) {
            alert('No event selected. Please choose an event first.');
            this.router.navigateByUrl('/browse-events');
            return;
        }

        // Create a pending booking and move to promo code step
        const seatNumbers = this.selectedSeats.map(seat => seat.number);
        const booking: Booking = {
            id: String(Date.now()),
            userId: this.auth.getUser()?.id,
            fullName: this.booking.fullName,
            email: this.booking.email,
            phone: this.booking.phone,
            eventId: this.selectedEvent.id,
            eventName: this.selectedEvent.name,
            seatNumbers,
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
