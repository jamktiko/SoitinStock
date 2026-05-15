import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RentingForm } from './renting-form';

// testing dependencies
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('RentingForm', () => {
  let component: RentingForm;
  let fixture: ComponentFixture<RentingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentingForm],
      // testing providers with mock values
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RentingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
