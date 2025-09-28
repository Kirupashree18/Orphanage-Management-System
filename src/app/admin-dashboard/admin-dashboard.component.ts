import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Orphan {
  id: string;
  name: string;
  age: number;
  gender: string;
  health: string;
  adoption_status: string;
}

interface Staff {
  name: string;
  age: number;
  role: string;
  contact: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class AdminDashboardComponent implements OnInit {
  orphans: Orphan[] = [];
  staff: Staff[] = [];
  showOrphanList = false;
  showStaffList = false;
  showDonorOptions = false;
  errorMessage: string = '';
  showUpdateForm: boolean = false;
  orphanId: string = '';
  orphan: Orphan | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      this.router.navigate(['/admin']);
    }
  }

  viewOrphans() {
    this.showDonorOptions = false;
    this.showStaffList = false;
    this.http.get<any>('http://localhost:3000/orphans').subscribe({
      next: (response) => {
        if (response.success) {
          this.orphans = response.data;
          this.showOrphanList = true;
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

  viewStaff() {
    this.showDonorOptions = false;
    this.showOrphanList = false;
    this.http.get<any>('http://localhost:3000/staff').subscribe({
      next: (response) => {
        if (response.success) {
          this.staff = response.data;
          this.showStaffList = true;
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

  viewDonorOptions() {
    this.showOrphanList = false;
    this.showStaffList = false;
    this.showDonorOptions = true;
    this.errorMessage = '';
  }

  toggleUpdateForm(): void {
    this.showUpdateForm = !this.showUpdateForm;
    this.orphan = null;
    this.orphanId = '';
    this.errorMessage = '';
  }

  getOrphanDetails(): void {
    if (!this.orphanId) {
      this.errorMessage = 'Please enter an Orphan ID';
      return;
    }
    this.http.get<any>(`http://localhost:3000/orphans/${this.orphanId}`).subscribe({
      next: (response) => {
        if (response.success) {
          this.orphan = response.data;
          this.errorMessage = '';
          console.log('📦 Orphan fetched:', this.orphan);
        } else {
          this.errorMessage = response.message || 'Orphan not found';
          this.orphan = null;
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch orphan:', err);
        this.errorMessage = 'Failed to load orphan details. Please check the ID or server.';
        this.orphan = null;
      },
    });
  }

  updateOrphanDetails(): void {
    if (this.orphan) {
      this.http
        .put<any>(`http://localhost:3000/orphans/${this.orphan.id}`, this.orphan)
        .subscribe({
          next: (response) => {
            if (response.success) {
              this.errorMessage = 'Orphan details updated successfully';
              this.orphan = null;
              this.orphanId = '';
              this.viewOrphans();
            } else {
              this.errorMessage = response.message || 'Failed to update orphan';
            }
          },
          error: (err) => {
            console.error('❌ Failed to update orphan:', err);
            this.errorMessage = 'Failed to update orphan. Please check the server.';
          },
        });
    } else {
      this.errorMessage = 'No orphan selected for update';
    }
  }

  cancelUpdate(): void {
    this.showUpdateForm = false;
    this.orphan = null;
    this.orphanId = '';
    this.errorMessage = '';
  }

  navigateTo(route: string) {
    if (route === '/view-donor') {
      this.router.navigate([route], { queryParams: { from: 'admin' } });
    } else {
      this.router.navigate([route]);
    }
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/admin']);
  }
}
