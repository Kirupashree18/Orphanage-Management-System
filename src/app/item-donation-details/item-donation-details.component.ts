import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface ItemDonation {
  _id: string;
  donorName: string;
  address: string;
  itemName: string;
  quantity: number;
  category: string;
  donationDate: string;
}

@Component({
  selector: 'app-item-donation-details',
  templateUrl: './item-donation-details.component.html',
  styleUrls: ['./item-donation-details.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ItemDonationDetailsComponent implements OnInit {
  donations: ItemDonation[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.http.get<{ success: boolean; data: ItemDonation[]; message?: string }>('http://localhost:3000/donate/item').subscribe({
      next: (response) => {
        if (response.success) {
          this.donations = response.data;
          if (this.donations.length === 0) {
            this.errorMessage = 'No item donations found.';
          }
        } else {
          this.errorMessage = response.message || 'Failed to fetch donations.';
        }
      },
      error: (error) => {
        console.error('Error fetching donations:', error);
        this.errorMessage = 'An error occurred while fetching donations. Please try again.';
      }
    });
  }
}
