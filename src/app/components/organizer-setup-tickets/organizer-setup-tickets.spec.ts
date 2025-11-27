import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSetupTickets } from './organizer-setup-tickets';

describe('OrganizerSetupTickets', () => {
  let component: OrganizerSetupTickets;
  let fixture: ComponentFixture<OrganizerSetupTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerSetupTickets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerSetupTickets);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
