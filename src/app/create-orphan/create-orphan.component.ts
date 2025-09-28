import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-orphan',
  templateUrl: './create-orphan.component.html',
  styleUrls: ['./create-orphan.component.css']
})
export class CreateOrphanComponent implements AfterViewInit {
  @ViewChild('orphanForm', { static: true }) orphanForm!: ElementRef<HTMLFormElement>;
  errorMessage: string = '';
  isFormReady: boolean = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    console.log('ViewChild initialized:', this.orphanForm); 
    if (this.orphanForm && this.orphanForm.nativeElement) {
      this.isFormReady = true;
      console.log('Form is ready for use.');
    } else {
      console.error('Form initialization failed.');
    }
  }

  saveRecord() {
    this.errorMessage = ''; 

  
    if (!this.orphanForm || !this.orphanForm.nativeElement) {
      this.errorMessage = 'Form not initialized. Please wait a moment and try again.';
      console.error('orphanForm is undefined or nativeElement is not accessible:', this.orphanForm);
      return;
    }

    const form = this.orphanForm.nativeElement;
    const data = {
      orphanId: (form.querySelector('#orphan_id') as HTMLInputElement).value,
      name: (form.querySelector('#name') as HTMLInputElement).value,
      age: Number((form.querySelector('#age') as HTMLInputElement).value),
      gender: (form.querySelector('#gender') as HTMLSelectElement).value,
      health: (form.querySelector('#health') as HTMLInputElement).value,
      adoptionStatus: (form.querySelector('#adoption_status') as HTMLSelectElement).value // Changed to adoptionStatus
    };

    console.log('Form data:', data); 

    // Basic validation
    if (!data.orphanId || !data.name || !data.age || !data.gender || !data.adoptionStatus) {
      this.errorMessage = 'Please fill all required fields';
      return;
    }


    // Validate age (must be a valid number greater than 1)
    if (isNaN(data.age) || data.age <= 1) {
      this.errorMessage = 'Orphan age must be a valid number greater than 1';
      return;
    }

    // Validate health (optional field, but should not be empty if provided)
    if (data.health && !data.health.trim()) {
      this.errorMessage = 'Health status cannot be empty if provided';
      return;
    }
    // Check if orphanId already exists
    this.http.get<any>(`http://localhost:3000/orphans/${data.orphanId}`).subscribe({
      next: (response) => {
        if (response) {
          this.errorMessage = 'Orphan ID already exists. Please use a different ID.';
          return;
        }

        // Proceed with saving if ID doesn't exist
        this.http.post('http://localhost:3000/orphans', data).subscribe({
          next: (response) => {
            console.log('Success:', response);
            alert('Orphan record saved successfully!');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error saving orphan record:', error);
            console.log('Server response:', error.error);
            this.errorMessage = 'Error saving orphan record: ' + (error.message || error.statusText) + '. Details: ' + JSON.stringify(error.error);
          }
        });
      },
      error: (err) => {
        console.error('Error checking orphan ID:', err);
        if (err.status === 404) {
      
          this.http.post('http://localhost:3000/orphans', data).subscribe({
            next: (response) => {
              console.log('Success (after 404):', response);
              alert('Orphan record saved successfully!');
              this.resetForm();
            },
            error: (error) => {
              console.error('Error saving orphan record:', error);
              console.log('Server response:', error.error); 
              this.errorMessage = 'Error saving orphan record: ' + (error.message || error.statusText) + '. Details: ' + JSON.stringify(error.error);
            }
          });
        } else if (err.status === 500) {
          this.errorMessage = `Server error checking orphan ID (500): ${err.message || err.statusText}. Attempting to save anyway...`;
          console.error('Server error details:', err);
         
          this.http.post('http://localhost:3000/orphans', data).subscribe({
            next: (response) => {
              console.log('Success (after 500 retry):', response);
              alert('Orphan record saved successfully!');
              this.resetForm();
            },
            error: (error) => {
              console.error('Error saving orphan record after 500:', error);
              console.log('Server response:', error.error);
              this.errorMessage = 'Failed to save due to server issues: ' + (error.message || error.statusText) + '. Details: ' + JSON.stringify(error.error);
            }
          });
        } else {
          this.errorMessage = 'Error checking orphan ID: ' + err.message;
        }
      }
    });
  }

  resetForm() {
    if (this.orphanForm && this.orphanForm.nativeElement) {
      this.orphanForm.nativeElement.reset();
    }
    this.errorMessage = '';
  }
}
