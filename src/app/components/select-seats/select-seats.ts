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
    sections: any[] = [];
    currentSectionIndex: number = 0;
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
        this.generateSeats();
    }

    generateSeats(): void {
        this.sections = [
            
            { name: 'Left Foyer', prefix: 'LF', seatPrice: 65 },
            { name: 'Middle Foyer', prefix: 'MF', seatPrice: 75 },
            { name: 'Right Foyer', prefix: 'RF', seatPrice: 85 },
            
            { name: 'Left Balcony', prefix: 'LB', seatPrice: 120 },
            { name: 'Middle Balcony', prefix: 'MB', seatPrice: 55 },
            { name: 'Right Balcony', prefix: 'RB', seatPrice: 45 }
            
        ];

        const rightFoyerLayout = {
            'A': 8, 'B': 10, 'C': 11, 'D': 12, 'E': 12, 'F': 12,
            'G': 12, 'H': 11, 'J': 10, 'K': 8, 'L': 5
        };

        const middleFoyerLayout = {
            'A': { start: 15, end: 33 }, 'B': { start: 15, end: 34 }, 'C': { start: 15, end: 33 },
            'D': { start: 15, end: 34 }, 'E': { start: 15, end: 31 }, 'F': { start: 15, end: 32 },
            'G': { start: 15, end: 31 }, 'H': { start: 15, end: 32 }, 'J': { start: 15, end: 29 },
            'K': { start: 15, end: 30 }
        };

        const middleBalconyLayout = {
            'AA': { start: 15, end: 36 },
            'BB': { start: 15, end: 36 },
            'CC': { start: 15, end: 36 },
            'DD': { start: 15, end: 35 }
        };

        const rightBalconyLayout = {
            'AA': 13, 'BB': 13, 'CC': 13, 'DD': 13, 'EE': 12
        };

        this.sections.forEach(section => {
            section.seatRows = [];
            if (section.name === 'Right Foyer') {
                for (const rowLetter of Object.keys(rightFoyerLayout)) {
                    const numSeats = rightFoyerLayout[rowLetter as keyof typeof rightFoyerLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    for (let j = numSeats; j >= 1; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else if (section.name === 'Middle Foyer') {
                for (const rowLetter of Object.keys(middleFoyerLayout)) {
                    const layout = middleFoyerLayout[rowLetter as keyof typeof middleFoyerLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    for (let j = layout.end; j >= layout.start; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else if (section.name === 'Left Foyer') {
                for (const rowLetter of Object.keys(rightFoyerLayout)) {
                    const numSeats = rightFoyerLayout[rowLetter as keyof typeof rightFoyerLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    const startSeat = 36;
                    const endSeat = startSeat + numSeats - 1;
                    for (let j = endSeat; j >= startSeat; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else if (section.name === 'Middle Balcony') {
                for (const rowLetter of Object.keys(middleBalconyLayout)) {
                    const layout = middleBalconyLayout[rowLetter as keyof typeof middleBalconyLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    for (let j = layout.end; j >= layout.start; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else if (section.name === 'Right Balcony') {
                for (const rowLetter of Object.keys(rightBalconyLayout)) {
                    const numSeats = rightBalconyLayout[rowLetter as keyof typeof rightBalconyLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    for (let j = numSeats; j >= 1; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else if (section.name === 'Left Balcony') {
                for (const rowLetter of Object.keys(rightBalconyLayout)) {
                    const numSeats = rightBalconyLayout[rowLetter as keyof typeof rightBalconyLayout];
                    const row: any = [];
                    (row as any).rowLetter = rowLetter;
                    const startSeat = 37;
                    const endSeat = startSeat + numSeats - 1;
                    for (let j = endSeat; j >= startSeat; j--) {
                        row.push({
                            number: `${rowLetter}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            } else {
                for (let i = 1; i <= section.rows; i++) {
                    const row: any = [];
                    (row as any).rowLetter = i;
                    for (let j = section.seatsPerRow; j >= 1; j--) {
                        row.push({
                            number: `${section.prefix}${i}-${j}`,
                            section: section.name,
                            selected: false,
                            occupied: Math.random() > 0.8
                        });
                    }
                    section.seatRows.push(row);
                }
            }
        });
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

    getPrice(seat: any): number {
        const section = this.sections.find(s => s.name === seat.section);
        return section ? section.seatPrice : 0;
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