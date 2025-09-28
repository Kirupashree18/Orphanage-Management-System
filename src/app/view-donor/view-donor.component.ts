import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Donor {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  donorCategory: string;
  reasonForCategory: string;
}

@Component({
  selector: 'app-view-donor',
  templateUrl: './view-donor.component.html',
  styleUrls: ['./view-donor.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ViewDonorComponent implements OnInit {
  donors: Donor[] = [];
  errorMessage: string = '';
  fromPage: string = 'staff'; 

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
 
    this.route.queryParams.subscribe(params => {
      this.fromPage = params['from'] || 'admin'; 
      console.log('From page set to:', this.fromPage);
      this.fetchDonors();
    });
  }

  fetchDonors(): void {
    this.http.get<any>('http://localhost:3000/donor').subscribe({
      next: (response) => {
        if (response.success) {
          this.donors = response.data;
          this.errorMessage = '';
          console.log('📦 Donors fetched:', this.donors);
        } else {
          this.errorMessage = response.message || 'Unknown error';
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch donors:', err);
        this.errorMessage = 'Failed to load donors. Please check the server.';
        alert(this.errorMessage);
      }
    });
  }

  goBack(): void {
    console.log('Navigating back from:', this.fromPage); 
    if (this.fromPage === 'admin') {
      this.router.navigate(['/admin-dashboard']).then(success => {
        if (!success) {
          console.error('Navigation to /admin failed');
        }
      });
    } else {
      this.router.navigate(['/staff']).then(success => {
        if (!success) {
          console.error('Navigation to /staff failed');
        }
      });
    }
  }
}
