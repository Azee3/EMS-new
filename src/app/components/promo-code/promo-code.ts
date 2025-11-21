import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-promo-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './promo-code.html',
  styleUrls: ['./promo-code.css']
})
export class PromoCodeComponent {
  promoCode: string = '';
  discount: number = 0;
  totalPrice: number = 0;
  finalPrice: number = 0;

  constructor(private bookingService: BookingService, private router: Router) {
    const b = this.bookingService.getCurrent();
    if (b) {
      this.totalPrice = b.subtotal;
      this.finalPrice = b.finalPrice;
    }
  }

  applyPromoCode() {
    const b = this.bookingService.getCurrent();
    if (!b) return;

    // Example promo rules
    if (this.promoCode === 'SALE10') {
      this.discount = b.subtotal * 0.1;
    } else if (this.promoCode === 'HALF50') {
      this.discount = b.subtotal * 0.5;
    } else {
      this.discount = 0;
    }

    this.finalPrice = b.subtotal - this.discount;
    // update booking
    b.promoCode = this.promoCode || null;
    b.discount = this.discount;
    b.finalPrice = this.finalPrice;
    b.updatedAt = new Date().toISOString();
    this.bookingService.setCurrent(b);
  }

  continueToReview() {
    this.router.navigateByUrl('/review-booking');
  }
}
