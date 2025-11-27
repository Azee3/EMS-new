import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerManageEvents } from './organizer-manage-events';

describe('OrganizerManageEvents', () => {
  let component: OrganizerManageEvents;
  let fixture: ComponentFixture<OrganizerManageEvents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerManageEvents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerManageEvents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
