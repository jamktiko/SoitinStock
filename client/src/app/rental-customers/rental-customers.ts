import { Component, OnInit } from '@angular/core';
import { ApiService } from '../apiService';

@Component({
  selector: 'app-rental-customers',
  imports: [],
  templateUrl: './rental-customers.html',
  styleUrl: './rental-customers.css',
})
export class RentalsComponent implements OnInit {
  rentals: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getRentals().subscribe({
      next: (data) => {
        this.rentals = data;
      },
      error: (err) => {
        console.error('Failed to fetch rentals', err);
      },
    });
  }
}
