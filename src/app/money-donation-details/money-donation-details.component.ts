import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


interface MoneyDonation {
  donorName: string;
  email: string;
  phone: string;
  address: string;
  amount: number;
  paymentMethod: string;
  donationDate: Date;
}

@Component({
  selector: 'app-money-donation-details',
  templateUrl: './money-donation-details.component.html',
  styleUrls: ['./money-donation-details.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class MoneyDonationDetailsComponent implements OnInit {
  donations: MoneyDonation[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>('http://localhost:3000/donate/money').subscribe({
      next: (response) => {
        if (response.success) {
          this.donations = response.data;
          this.loading = false;
        } else {
          this.errorMessage = response.message || 'Failed to fetch donation details';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching money donations:', err);
        this.errorMessage = 'Failed to connect to the server. Please try again later.';
        this.loading = false;
      }
    });
  }
}
