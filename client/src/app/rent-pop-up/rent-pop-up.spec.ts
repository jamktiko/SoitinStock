import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentPopUp } from './rent-pop-up';

describe('RentPopUp', () => {
  let component: RentPopUp;
  let fixture: ComponentFixture<RentPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPopUp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentPopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
