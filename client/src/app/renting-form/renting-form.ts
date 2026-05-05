import { Component, input, linkedSignal, output, signal, inject, computed } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../apiService';
import { RawItem } from '../.models/item';
import { ProductStore } from '../instrumentstore';
import { first } from 'rxjs';

@Component({
  selector: 'app-renting-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  templateUrl: './renting-form.html',
  styleUrl: './renting-form.css',
})
export class RentingForm {
  private pstore = inject(ProductStore);
  private _formBuilder = inject(FormBuilder);
  private apiService = inject(ApiService);

  allItems = this.pstore.items;
  allInstruments = this.pstore.instruments;

  itemsWithDetails = computed(() => {
    return this.allItems().map((item) => {
      const instrument = this.allInstruments().find(
        (i) => i.id_Instrument === item.Instrument_id_Instrument,
      );
      return {
        ...item,
        instrumentName: instrument?.name || 'Unknown',
        instrumentModel: instrument?.model || '',
      };
    });
  });

  rentalItem = input<RawItem>();
  timeSelected = 'day';
  rentalForm: FormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    rentals: this._formBuilder.array([this.createRentalRow()]),
  });

  get rentals(): FormArray {
    return this.rentalForm.get('rentals') as FormArray;
  }

  createRentalRow(): FormGroup {
    return this._formBuilder.group({
      selectedItem: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      rentalType: ['day', Validators.required],
    });
  }

  addRentalRow() {
    this.rentals.push(this.createRentalRow());
  }

  removeRentalRow(index: number) {
    this.rentals.removeAt(index);
  }

  // submitRental() {
  //   if (this.rentalForm.valid) {
  //     this.apiService
  //       .submitRental({
  //         itemId: this.rentalItem().id_Item,
  //         ...this.rentalForm.value,
  //       })
  //       .subscribe({
  //         next: (response) => console.log('Rental submitted:', response),
  //         error: (err) => console.error('Rental failed:', err),
  //       });
  //   }
  // }

  submitTest() {
    console.log('testi tallennettu');
  }
}
