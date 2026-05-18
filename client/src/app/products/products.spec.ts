import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Products } from './products';

// testing dependencies
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// mock dependencies:
import { MatDialog } from '@angular/material/dialog';
import { ProductStore } from '../instrumentstore';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      // testing providers with mock values
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: ProductStore,
          useValue: {
            items: () => [
              { Instrument_id_Instrument: 1, is_available: true },
              { Instrument_id_Instrument: 1, is_available: true },
              { Instrument_id_Instrument: 2, is_available: false },
              { Instrument_id_Instrument: 2, is_available: true },
            ],
            instruments: () => [
              { id_Instrument: 1, name: 'guitar' },
              { id_Instrument: 2, name: 'piano' },
            ],
            isLoading: () => false,
          },
        },
        {
          // mock dialog
          provide: MatDialog,
          useValue: {
            open: () => ({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CUSTOM TESTS:

  // tests that getItemCount returns correct counts based on mock data
  it('should return correct item counts per instrument', () => {
    expect(component.getItemCount(1)).toBe(2);
    expect(component.getItemCount(2)).toBe(1);
  });

  // tests valid ID
  it('should return 0 for unknown instrument id', () => {
    expect(component.getItemCount(999)).toBe(0);
  });

  // ignores unavilable items
  it('should ignore unavailable items in count', () => {
    expect(component.getItemCount(2)).toBe(1); // not 2
  });
});
