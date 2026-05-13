import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingForm } from './renting-form';

describe('RentingForm', () => {
  let component: RentingForm;
  let fixture: ComponentFixture<RentingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RentingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
