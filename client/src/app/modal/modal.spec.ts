import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Modal } from './modal';

// testing dependencies
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// mock dependencies:
import { RentalStore } from '../rentalStore';
import { ProductStore } from '../instrumentstore';
import { vi } from 'vitest';

const mockRentalStore = {
  cartItemBarcodes: vi.fn(() => []),
  addToCart: vi.fn(),
};

const mockProductStore = {
  items: vi.fn(() => [
    {
      barcode: '123',
      Instrument_id_Instrument: 1,
      item_condition: 'Good',
      rent_day: 10,
      rent_week: 50,
      rent_month: 100,
      is_available: true,
    },
    {
      barcode: '456',
      Instrument_id_Instrument: 2,
      item_condition: 'Fair',
      rent_day: 5,
      rent_week: 25,
      rent_month: 60,
      is_available: true,
    },
  ]),
};

const mockDialogRef = {
  close: vi.fn(),
};

describe('Modal', () => {
  let component: Modal;
  let fixture: ComponentFixture<Modal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modal],
      providers: [
        // testing providers with mock values
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            instrument: {
              id_Instrument: 1,
              name: 'guitar',
            },
          },
        },
        { provide: RentalStore, useValue: mockRentalStore },
        { provide: ProductStore, useValue: mockProductStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Modal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // CUSTOM TESTS:

  // tests that relatedItems returns correct items for the instrument
  it('should return correct related items for the instrument', () => {
    expect(component.relatedItems().length).toBe(1);
    expect(component.relatedItems()[0].barcode).toBe('123');
  });

  // verifies that the store action was called when addToCart is invoked
  it('should add item to cart', () => {
    const item = component.relatedItems()[0];
    component.addToCart(item);
    expect(mockRentalStore.addToCart).toHaveBeenCalled();
  });

  // tests that modal closes.
  it('should close modal', () => {
    component.closeModal();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  // tests that image loading state is updated when image appears
  it('should stop image loading when imageLoad is called', () => {
    component.imageLoad();
    expect(component.imageIsLoading()).toBe(false);
  });
});
