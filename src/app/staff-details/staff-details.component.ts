import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Staff {
  id: number;
  name: string;
  age: number;
  gender: string;
  experience: number;
  address: string;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StaffDetailsComponent implements OnInit {
  staff: Staff[] = [];
  errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.viewStaff();
  }

  viewStaff(): void {
    this.http.get<{ success: boolean; data: Staff[]; message?: string }>('http://localhost:3000/staff').subscribe({
      next: (response) => {
        if (response.success) {
          this.staff = response.data;
          this.errorMessage = '';
          console.log('📦 Staff fetched:', this.staff);
        } else {
          this.errorMessage = response.message || 'Unknown server error';
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch staff:', err);
        this.errorMessage = 'Failed to load staff. Please ensure the server is running and try again.';
      },
    });
  }
}
