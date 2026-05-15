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
import { RentPopUp } from '../rent-pop-up/rent-pop-up';
import { MatDialog } from '@angular/material/dialog';
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
  private _formBuilder = inject(FormBuilder); // Auttaa formien teossa
  private apiService = inject(ApiService);
  private dialog = inject(MatDialog);
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
  }); //Returns totalprice based on cost, amount of items and rentalType
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
  }); // Finds the details of the items
  rentalForm: FormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/\d{10}$/)]],
    email: ['', [Validators.required, Validators.email]],
    rentals: this._formBuilder.array([]),
    rentalType: ['day', Validators.required],
  }); // Needed fields in the rentalForm

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
    this.rentalForm.get('rentalType')?.valueChanges.subscribe((value) => {
      this.selectedRentalType.set(value);
    });
  }

  createRentalRow(barcode?: string): FormGroup {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

    return this._formBuilder.group({
      selectedItem: [barcode || '', Validators.required],
      startDate: [{ value: today, disabled: true }, Validators.required], // Set today and disable
    });
  }

  submitRentForm() {
    const formValue = this.rentalForm.getRawValue();
    // const rentalType = formValue.rentals[0]?.rentalType;

    const rentalsWithEndDates = formValue.rentals.map((rental: any) => ({
      ...rental,
      endDate: this.calculateEndDate(rental.startDate, rental.rentalType),
    })); // Calculate end dates for each rental

    const payload = {
      email: formValue.email,
      firstname: formValue.firstName,
      lastname: formValue.lastName,
      phone: formValue.phone,
      items: this.cartItems().map((item) => item.barcode),
      end_date: rentalsWithEndDates[0]?.endDate, // Use first rental's end date (or handle multiple)
      total_price: this.totalPrice(),
    }; // Build payload the backend expects

    this.apiService.submitRental(payload).subscribe({
      next: () => {
        console.log('Rental submitted successfully');
        this.rstore.clearCart();
        this.pstore.refreshItems();

        this.dialog.open(RentPopUp);
      },
      error: (err) => console.error('Rental failed:', err),
    }); // Laittaa submitRental-funktioon payloadin, ja sen jälkeen tyhjentää korin ja lataa storen uudestaan
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
