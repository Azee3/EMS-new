import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-organizer-edit-ticket-type',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './organizer-edit-ticket-type.html',
  styleUrl:'./organizer-edit-ticket-type.css',
})


export class OrganizerEditTicketTypeComponent {
  
  
}
