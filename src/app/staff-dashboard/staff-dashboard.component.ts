import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Orphan {
  orphanId: string;
  name: string;
  age: number;
  gender: string;
  health: string;
  adoption_status: string;
}

interface Staff {
  id: string;
  name: string;
  age: number;
  gender: string;
  experience: number;
  address: string;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class StaffDashboardComponent implements OnInit {
  staff: Staff[] = [];
  orphans: Orphan[] = [];
  showStaffList: boolean = false;
  showOrphanList: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    const isStaffLoggedIn = localStorage.getItem('isStaffLoggedIn');
    if (isStaffLoggedIn !== 'true') {
      this.router.navigate(['/staff']);
    }
  }

  viewStaff(): void {
    this.http.get<any>('http://localhost:3000/staff').subscribe({
      next: (response) => {
        if (response.success) {
          this.staff = response.data;
          this.showStaffList = true;
          this.showOrphanList = false;
          this.errorMessage = '';
          console.log('📦 Staff fetched:', this.staff);
        } else {
          this.errorMessage = response.message || 'Unknown error';
          this.showStaffList = false;
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch staff:', err);
        this.errorMessage = 'Failed to load staff. Please check the server.';
        this.showStaffList = false;
        alert(this.errorMessage);
      },
    });
  }

  viewOrphans(): void {
    this.http.get<any>('http://localhost:3000/orphans').subscribe({
      next: (response) => {
        if (response.success) {
          this.orphans = response.data;
          this.showOrphanList = true;
          this.showStaffList = false;
          this.errorMessage = '';
          console.log('📦 Orphans fetched:', this.orphans);
        } else {
          this.errorMessage = response.message || 'Unknown error';
          this.showOrphanList = false;
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch orphans:', err);
        this.errorMessage = 'Failed to load orphans. Please check the server.';
        this.showOrphanList = false;
        alert(this.errorMessage);
      },
    });
  }

  logout(): void {
    localStorage.removeItem('isStaffLoggedIn');
    this.router.navigate(['/staff']);
  }
}
