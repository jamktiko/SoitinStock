import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentPopUp } from './rent-pop-up';

import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('RentPopUp', () => {
  let component: RentPopUp;
  let fixture: ComponentFixture<RentPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentPopUp],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RentPopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
