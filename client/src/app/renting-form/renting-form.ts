import {
  Component,
  input,
  linkedSignal,
  output,
  signal,
  inject,
  computed,
  effect,
} from '@angular/core';
import { FormArray, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../apiService';
// import { RawItem } from '../.models/item';
import { ProductStore } from '../instrumentstore';
import { RentalStore } from '../rentalStore';
import { CurrencyPipe } from '@angular/common';
// import { first } from 'rxjs';

@Component({
  selector: 'app-renting-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    CurrencyPipe,
  ],
  templateUrl: './renting-form.html',
  styleUrl: './renting-form.css',
})
export class RentingForm {
  private pstore = inject(ProductStore);
  private rstore = inject(RentalStore);
  private _formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);
  cartItems = this.rstore.products;

  allInstruments = this.pstore.instruments;

  selectedRentalType = signal<string>('day'); // Track the selected type

  totalPrice = computed(() => {
    const rentalType = this.selectedRentalType();

    return this.cartItems().reduce((sum, item) => {
      const pricePerUnit =
        rentalType === 'week'
          ? item.rent_week
          : rentalType === 'month'
            ? item.rent_month
            : item.rent_day;

      return sum + pricePerUnit * item.amount;
    }, 0);
  });
  cartItemsWithDetails = computed(() => {
    return this.cartItems().map((item) => {
      const instrument = this.allInstruments().find(
        (i) => i.id_Instrument === item.Instrument_id_Instrument,
      );
      return {
        ...item,
        instrumentName: instrument?.name || 'Unknown',
      };
    });
  });
  rentalForm: FormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required],
    rentals: this._formBuilder.array([]),
  });

  get rentals(): FormArray {
    return this.rentalForm.get('rentals') as FormArray;
  }

  constructor() {
    // Watch cartItems and update form automatically
    effect(() => {
      const items = this.cartItems();
      this.rentals.clear(); // Clear existing rows
      items.forEach((item) => {
        this.rentals.push(this.createRentalRow(item.barcode));
      });
    });
    effect(() => {
      const rentalType = this.rentalForm.get('rentals.0.rentalType')?.value;
      if (rentalType) {
        this.selectedRentalType.set(rentalType);
      }
    });
  }

  createRentalRow(barcode?: string): FormGroup {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return this._formBuilder.group({
      selectedItem: [barcode || '', Validators.required],
      startDate: [{ value: today, disabled: true }, Validators.required], // Set today and disable
      endDate: [''],
      rentalType: ['day', Validators.required],
    });
  }

  submitTest() {
    const formValue = this.rentalForm.value;
    const rentalType = formValue.rentals[0]?.rentalType;

    // Calculate end dates for each rental
    const rentalsWithEndDates = formValue.rentals.map((rental: any) => ({
      ...rental,
      endDate: this.calculateEndDate(rental.startDate, rental.rentalType),
    }));

    // Build payload the backend expects
    const payload = {
      email: formValue.email,
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      phone: formValue.phone,
      items: this.cartItems().map((item) => item.barcode),
      end_date: rentalsWithEndDates[0]?.endDate, // Use first rental's end date (or handle multiple)
      total_price: this.totalPrice(),
    };

    this.apiService.submitRental(payload).subscribe({
      next: () => {
        console.log('Rental submitted successfully');
        this.rstore.clearCart();
      },
      error: (err) => console.error('Rental failed:', err),
    });
  }

  calculateEndDate(startDate: string, rentalType: string): string {
    const start = new Date(startDate);
    const end = new Date(start);

    if (rentalType === 'week') {
      end.setDate(end.getDate() + 7);
    } else if (rentalType === 'month') {
      end.setMonth(end.getMonth() + 1);
    } else {
      end.setDate(end.getDate() + 1);
    }

    return end.toISOString().split('T')[0];
  }

  // addRentalRow() {
  //   this.rentals.push(this.createRentalRow());
  // }

  removeRentalRow(index: number) {
    this.rentals.removeAt(index);
  }
}
