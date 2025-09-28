import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-staff',
  templateUrl: './create-staff.component.html',
  styleUrls: ['./create-staff.component.css'],
  standalone: true,
})
export class CreateStaffComponent {
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  createStaff(event: Event): void {
    event.preventDefault();


    const id = (document.getElementById('id') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const age = parseInt((document.getElementById('age') as HTMLInputElement).value, 10);
    const gender = (document.getElementById('gender') as HTMLInputElement).value;
    const experience = parseInt((document.getElementById('experience') as HTMLInputElement).value, 10);
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const role = (document.getElementById('role') as HTMLSelectElement).value;
    const contact = (document.getElementById('contact') as HTMLInputElement).value;

    // Validate required fields
    if (!id || !name || !age || !gender || !experience || !address || !role || !contact) {
      this.errorMessage = 'All fields are required';
      return;
    }

    // Validate age (must be above 25)
    if (age <= 25) {
      this.errorMessage = 'Staff age must be above 25';
      return;
    }

    // Validate experience (must be above 0.5 years)
    if (experience <= 0.5) {
      this.errorMessage = 'Experience must be above 0.5 years';
      return;
    }

    // Validate gender
    if (!['Male', 'Female', 'Others'].includes(gender)) {
      this.errorMessage = 'Please select a valid gender';
      return;
    }

    // Validate role
    if (!['Caregiver', 'Educator', 'Administrator', 'Maintenance Worker'].includes(role)) {
      this.errorMessage = 'Please select a valid role';
      return;
    }

    // Validate contact (exactly 10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      this.errorMessage = 'Phone number must be exactly 10 digits';
      return;
    }

   
    this.errorMessage = '';

 
    this.http.get<any>(`http://localhost:3000/staff/${id}`).subscribe({
      next: (response) => {
        if (response) {
          this.errorMessage = 'Staff ID already exists. Please use a different ID.';
          return;
        }

      
        const staffData = { id, name, age, gender, experience, address, role, contact };

        
        this.http.post<any>('http://localhost:3000/staff', staffData).subscribe({
          next: (response) => {
            if (response.success) {
              alert('Staff record created successfully!');
              this.router.navigate(['/admin']);
            } else {
              this.errorMessage = response.message || 'Failed to create staff record';
            }
          },
          error: (err) => {
            console.error('❌ Failed to create staff:', err);
            this.errorMessage = 'Failed to create staff record. Please check the server or ensure the database is running.';
          }
        });
      },
      error: (err) => {
      
        if (err.status === 404) {
          const staffData = { id, name, age, gender, experience, address, role, contact };
          this.http.post<any>('http://localhost:3000/staff', staffData).subscribe({
            next: (response) => {
              if (response.success) {
                alert('Staff record created successfully!');
                this.router.navigate(['/admin']);
              } else {
                this.errorMessage = response.message || 'Failed to create staff record';
              }
            },
            error: (err) => {
              console.error('❌ Failed to create staff:', err);
              this.errorMessage = 'Failed to create staff record. Please check the server or ensure the database is running.';
            }
          });
        } else {
          console.error('❌ Error checking staff ID:', err);
          this.errorMessage = 'Error checking staff ID. Please try again.';
        }
      }
    });
  }
}
