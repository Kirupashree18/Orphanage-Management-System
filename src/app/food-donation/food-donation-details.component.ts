import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FoodDonation {
  donorName: string;
  foodType: string;
  quantity: number;
  contactPhone: string;
  donationDate: Date;
}

@Component({
  selector: 'app-food-donation-details',
  templateUrl: './food-donation-details.component.html',
  styleUrls: ['./food-donation-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FoodDonationDetailsComponent implements OnInit {
  donations: FoodDonation[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchDonations();
  }

  fetchDonations() {
    this.http.get<any>('http://localhost:3000/donate/food').subscribe({
      next: (response) => {
        if (response.success) {
          this.donations = response.data.map((item: any) => ({
            donorName: item.donorName,
            foodType: item.foodType,
            quantity: item.quantity,
            contactPhone: item.contactPhone,
            donationDate: new Date(item.donationDate)
          }));
        } else {
          this.errorMessage = response.message || 'Failed to load donations';
          this.donations = [];
        }
      },
      error: (err) => {
        console.error('HTTP error:', err);
        this.errorMessage = 'Failed to load donations. Please check the server.';
        this.donations = [];
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
