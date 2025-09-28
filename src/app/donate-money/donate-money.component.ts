import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donate-money',
  templateUrl: './donate-money.component.html',
  styleUrls: ['./donate-money.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DonateMoneyComponent {
  donorName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  amount: number | null = null;
  paymentMethod: string = '';
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  proceedToDonate(form: any) {
    if (form.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Prepare donation data
      const donationData = {
        donorName: this.donorName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim(),
        address: this.address.trim(),
        amount: this.amount,
        paymentMethod: this.paymentMethod,
        donationDate: new Date()
      };

      console.log('Donation Data:', donationData); 

 
      if (this.paymentMethod === 'credit') {
        this.router.navigate(['/credit-card-payment'], { state: { donationData } });
      } else if (this.paymentMethod === 'debit') {
        this.router.navigate(['/debit-card-payment'], { state: { donationData } });
      } else {
        this.errorMessage = 'Please select a valid payment method.';
        this.isSubmitting = false;
      }
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
      this.isSubmitting = false;
    }
  }
}
