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
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['./update-staff.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UpdateStaffComponent implements OnInit {
  staff: Staff | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fetchStaffDetails(staffId: string): void {
    if (!staffId) {
      this.errorMessage = 'Please enter a valid Staff ID.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.get<{ success: boolean; data: Staff; message?: string }>(`http://localhost:3000/staff/${staffId}`).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.staff = response.data;
          this.errorMessage = '';
          console.log('📦 Staff fetched:', this.staff);
        } else {
          this.errorMessage = response.message || 'Staff not found.';
          this.staff = null;
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch staff details. Please check the server or ID.';
        this.staff = null;
        console.error('❌ Fetch error:', err);
      },
    });
  }

  saveStaff(name: string, age: string, gender: string, experience: string, address: string, role: string, contact: string): void {
    if (!this.staff || !name || !age || !gender || !experience || !address || !role || !contact) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const updatedStaff: Staff = {
      id: this.staff.id,
      name,
      age: parseInt(age),
      gender,
      experience: parseInt(experience),
      address,
      role,
      contact,
    };

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.put<{ success: boolean; message: string }>(`http://localhost:3000/staff/${this.staff.id}`, updatedStaff).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = response.message || 'Staff details updated successfully.';
          this.staff = updatedStaff;
        } else {
          this.errorMessage = response.message || 'Failed to update staff details.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to save staff details. Please try again.';
        console.error('❌ Save error:', err);
      },
    });
  }

  deleteStaff(): void {
    if (!this.staff) {
      this.errorMessage = 'No staff selected to delete.';
      return;
    }

    if (!confirm('Are you sure you want to delete this staff member?')) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.http.delete<{ success: boolean; message: string }>(`http://localhost:3000/staff/${this.staff.id}`).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success) {
          this.successMessage = response.message || 'Staff deleted successfully.';
          this.staff = null;
        } else {
          this.errorMessage = response.message || 'Failed to delete staff.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Failed to delete staff. Please try again.';
        console.error('❌ Delete error:', err);
      },
    });
  }

  cancelEdit(): void {
    this.staff = null;
    this.errorMessage = '';
    this.successMessage = '';
  }
}
