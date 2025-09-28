import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface AdoptionApplication {
  fullName: string;
  age: number;
  email: string;
  phone: string;
  income: number;
  occupation: string;
  maritalStatus: string;
  familyType: string;
  householdMembers: number;
  address: string;
  preferredAge: string;
  preferredGender: string;
}

@Component({
  selector: 'app-adopter-details',
  templateUrl: './adopter-details.component.html',
  styleUrls: ['./adopter-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class AdopterDetailsComponent implements OnInit {
  adopters: AdoptionApplication[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchAdopters();
  }

  fetchAdopters(): void {
    this.http.get<any>('http://localhost:3000/adopter-details').subscribe({
      next: (response) => {
        if (response.success) {
          this.adopters = response.data;
          this.errorMessage = '';
          console.log('📦 Adopters fetched:', this.adopters);
        } else {
          this.errorMessage = response.message || 'Unknown error';
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch adopters:', err);
        this.errorMessage = 'Failed to load adopters. Please check the server.';
        alert(this.errorMessage);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}
