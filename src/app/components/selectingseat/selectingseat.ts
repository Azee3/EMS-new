import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selectingseat',
  imports: [RouterLink],
  templateUrl: './selectingseat.html',
  styleUrl: './selectingseat.css',
})
export class SelectingseatComponent {

   sections = [
    { id: 'vip', name: 'VIP Front', price: 150 },
    { id: 'left', name: 'Left Orchestra', price: 100 },
    { id: 'right', name: 'Right Orchestra', price: 100 },
    { id: 'center', name: 'Center Orchestra', price: 120 },
    { id: 'left_balcony', name: 'Left Balcony', price: 80 },
    { id: 'right_balcony', name: 'Right Balcony', price: 80 }
  ];

  activeSection = 'vip';

  setActiveSection(sectionId: string) {
    this.activeSection = sectionId;
  }

  onSectionClick(sectionId: string) {
    console.log('Selected section:', sectionId);
    // Navigate to seat selection or show modal
    this.selectSection(sectionId);
  }

  selectSection(sectionId: string) {
    // Your selection logic here
    console.log('Proceeding with section:', sectionId);
  }

}
