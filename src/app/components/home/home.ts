import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { EventCards as EventCardsService } from '../../services/event-cards.service';
import { EventCards } from '../event-cards/event-cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, EventCards, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomeComponent { 
  private eventCardsService = inject(EventCardsService);
  data = this.eventCardsService.data;


 
}
