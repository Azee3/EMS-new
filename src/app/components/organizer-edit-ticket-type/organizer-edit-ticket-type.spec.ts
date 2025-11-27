import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerEditTicketType } from './organizer-edit-ticket-type';

describe('OrganizerEditTicketType', () => {
  let component: OrganizerEditTicketType;
  let fixture: ComponentFixture<OrganizerEditTicketType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerEditTicketType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerEditTicketType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
