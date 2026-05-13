import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './rent-pop-up.html',
  styleUrl: './rent-pop-up.css',
})
export class RentPopUp {
  dialogRef = inject(MatDialogRef<RentPopUp>);
  router = inject(Router);
  onClose() {
    this.dialogRef.close();
    this.router.navigate(['/products']);
  }
}
