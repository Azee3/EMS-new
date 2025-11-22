import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selectingseat } from './selectingseat';

describe('Selectingseat', () => {
  let component: Selectingseat;
  let fixture: ComponentFixture<Selectingseat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selectingseat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Selectingseat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
