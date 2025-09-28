import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// Reuse the Orphan interface from OrphanDetailsComponent
interface Orphan {
  orphanId: string;
  name: string;
  age: number;
  gender: string;
  health?: string;
  adoption_status: string;
}

@Component({
  selector: 'app-update-orphan',
  templateUrl: './update-orphan.component.html',
  styleUrls: ['./update-orphan.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class UpdateOrphanComponent implements OnInit {
  orphan: Orphan | null = null; // Holds the fetched orphan data
  errorMessage: string = ''; // Displays errors
  successMessage: string = ''; // Displays success messages
  loading: boolean = false; // Track API call status

  @ViewChild('orphanIdInput') orphanIdInput!: ElementRef; // Reference to the Orphan ID input

  private apiUrl = 'http://localhost:3000/orphans'; // Same API as OrphanDetailsComponent

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // No initialization needed
  }

  // Fetch orphan details by ID
  fetchOrphanDetails(orphanId: string): void {
    if (!orphanId.trim()) {
      this.errorMessage = 'Please enter a valid Orphan ID';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true; // Start loading
    console.log('Fetching orphan with ID:', orphanId); // Debug log

    this.http.get<any>(`${this.apiUrl}/${orphanId}`).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Debug response
        this.loading = false; // Stop loading
        if (response.success && response.data) {
          this.orphan = this.mapOrphan(response.data);
          this.errorMessage = '';
        } else {
          this.orphan = null;
          this.errorMessage = 'Invalid Orphan ID. Please enter a valid Orphan ID.';
        }
        this.cdr.detectChanges(); // Ensure UI updates
      },
      error: (err) => {
        console.error('Error fetching orphan:', err); // Detailed error log
        this.loading = false; // Stop loading
        this.orphan = null;
        this.errorMessage = this.getErrorMessage(err);
        if (err.status === 500) {
          console.log('Server error details:', err.message || err.statusText);
        }
        this.cdr.detectChanges(); // Ensure UI updates
      }
    });
  }

  // Save updated orphan details
  saveOrphan(name: string, age: string, gender: string, health: string, adoptionStatus: string): void {
    if (!this.orphan) {
      this.errorMessage = 'No orphan data to save';
      return;
    }

    if (!name.trim() || !age.trim() || !gender || !adoptionStatus) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }
    const parsedAge = parseInt(age, 10);
    if (isNaN(parsedAge) || parsedAge <= 1) {
      this.errorMessage = 'Orphan age must be a valid number greater than 1';
      return;
    }

    const updatedOrphan: Orphan = {
      ...this.orphan,
      name: name.trim(),
      age: parseInt(age, 10),
      gender,
      health: health.trim() || undefined,
      adoption_status: adoptionStatus
    };

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true; // Start loading
    this.http.put<any>(`${this.apiUrl}/${this.orphan.orphanId}`, updatedOrphan).subscribe({
      next: (response) => {
        console.log('Update Response:', response);
        this.loading = false; // Stop loading
        if (response.success) {
          this.successMessage = 'Orphan updated successfully';
          this.orphan = null; // Clear the form
          this.clearOrphanIdInput(); // Clear the Orphan ID input
        } else {
          this.errorMessage = response.message || 'Failed to update orphan';
        }
        this.cdr.detectChanges(); // Ensure UI updates
      },
      error: (err) => {
        console.error('Error updating orphan:', err);
        this.loading = false; // Stop loading
        this.errorMessage = this.getErrorMessage(err);
        this.cdr.detectChanges(); // Ensure UI updates
      }
    });
  }

  // Delete orphan details
  deleteOrphan(): void {
    if (!this.orphan || !this.orphan.orphanId) {
      this.errorMessage = 'No orphan selected to delete';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true; // Start loading
    this.http.delete<any>(`${this.apiUrl}/${this.orphan.orphanId}`).subscribe({
      next: (response) => {
        console.log('Delete Response:', response);
        this.loading = false; // Stop loading
        if (response.success) {
          this.successMessage = 'Orphan deleted successfully';
          this.orphan = null; // Clear the form
          this.clearOrphanIdInput(); // Clear the Orphan ID input
        } else {
          this.errorMessage = response.message || 'Failed to delete orphan';
        }
        this.cdr.detectChanges(); // Ensure UI updates
      },
      error: (err) => {
        console.error('Error deleting orphan:', err);
        this.loading = false; // Stop loading
        this.errorMessage = this.getErrorMessage(err);
        this.cdr.detectChanges(); // Ensure UI updates
      }
    });
  }

  // Cancel editing
  cancelEdit(): void {
    this.orphan = null;
    this.errorMessage = '';
    this.successMessage = '';
    this.clearOrphanIdInput(); // Clear the Orphan ID input
    this.cdr.detectChanges(); // Force change detection to ensure UI updates
  }

  // Clear the Orphan ID input field
  private clearOrphanIdInput(): void {
    if (this.orphanIdInput) {
      this.orphanIdInput.nativeElement.value = ''; // Reset the input field
    }
  }

  // Map API response to Orphan interface
  private mapOrphan(data: any): Orphan {
    return {
      orphanId: data.orphanId || 'N/A',
      name: data.name || 'Unknown',
      age: data.age || 0,
      gender: data.gender || 'Not Specified',
      health: data.health || 'Not Specified',
      adoption_status: data.adoption_status || 'Not Available'
    };
  }

  // Handle HTTP errors
  private getErrorMessage(error: any): string {
    if (error.status === 404) {
      return 'Invalid Orphan ID. Please enter a valid Orphan ID.';
    } else if (error.status === 500) {
      return 'Server error occurred. Please try again later. Details: ' + (error.message || error.statusText);
    }
    return `Failed to load data: ${error.message || 'Unknown error'}. Please check your connection or try again.`;
  }
}
