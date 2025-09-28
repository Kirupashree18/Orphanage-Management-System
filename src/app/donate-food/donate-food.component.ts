import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-donate-food',
  templateUrl: './donate-food.component.html',
  styleUrls: ['./donate-food.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class DonateFoodComponent implements OnInit {
  donorName: string = '';
  foodType: string = '';
  quantity: number | null = null;
  contactPhone: string = '';
  donationDate: string = '';
  showSuccess: boolean = false;
  errorMessage: string = '';
  isSubmitting: boolean = false;
  minDate: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    const donationData = {
      donorName: this.donorName,
      foodType: this.foodType,
      quantity: this.quantity,
      contactPhone: this.contactPhone,
      donationDate: this.donationDate
    };


    this.http.post<any>('http://localhost:3000/donate/food', donationData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showSuccess = true;
          this.resetForm();
        } else {
          this.errorMessage = response.message || 'Failed to submit donation';
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('❌ Failed to submit donation:', err);
        this.errorMessage = 'Failed to connect to the server. Please try again.';
        this.isSubmitting = false;
      },
    });
  }

  resetForm(): void {
    this.donorName = '';
    this.foodType = '';
    this.quantity = null;
    this.contactPhone = '';
    this.donationDate = '';
  }

  dismissSuccess(): void {
    this.showSuccess = false;
  }
}
