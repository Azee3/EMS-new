import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-event-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-cards.html',
  styleUrl: './event-cards.css',
})
export class EventCards {
  @Input() id: any = '';
  @Input() picture: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() date: Date | null = null;
  @Input() startTime: string = '';
  @Input() location: string = '';
  @Input() ticketsLeft: number = 0;
  @Input() status: string = '';
  @Input() onWaitlist: boolean = false;

  @Output() book = new EventEmitter<void>();
  @Output() joinWaitlist = new EventEmitter<void>();

  onBook() {
    this.book.emit();
  }

  onJoinWaitlist() {
    this.joinWaitlist.emit();
  }
}
