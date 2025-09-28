import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-donor',
  templateUrl: './register-donor.component.html',
  styleUrls: ['./register-donor.component.css'],
  standalone: true,
})
export class RegisterDonorComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Attach submit event listener to the form
    const form = document.getElementById('donorForm') as HTMLFormElement;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submitForm();
    });
  }

  submitForm(): void {
    // Get form elements
    const form = document.getElementById('donorForm') as HTMLFormElement;
    const fullName = (form.querySelector('#name') as HTMLInputElement).value;
    const email = (form.querySelector('#email') as HTMLInputElement).value;
    const phone = (form.querySelector('#phone') as HTMLInputElement).value;
    const address = (form.querySelector('#address') as HTMLTextAreaElement).value;
    const donorCategory = (form.querySelector('#donationCategory') as HTMLSelectElement).value;
    const reasonForDonation = (form.querySelector('#reasonForDonation') as HTMLSelectElement).value;

    // Validate required fields
    if (!fullName || !email || !phone || !address || !donorCategory || !reasonForDonation) {
      this.showError('All fields are required');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.showError('Please enter a valid email address');
      return;
    }

    // Validate phone number (exactly 10 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 || isNaN(Number(cleanPhone))) {
      this.showError('Phone number must be exactly 10 digits');
      return;
    }

    // Validate donor category
    const validCategories = ['individual', 'organization', 'business', 'non_profit', 'government', 'other'];
    if (!validCategories.includes(donorCategory)) {
      this.showError('Please select a valid donation category');
      return;
    }

    // Validate reason for donation
    const validReasons = [
      'public_acknowledgment', 'birthday', 'marriage', 'anniversary', 'memorial',
      'charity_event', 'religious_festival', 'graduation', 'new_baby',
      'fundraising_campaign', 'general_support'
    ];
    if (!validReasons.includes(reasonForDonation)) {
      this.showError('Please select a valid reason for donation');
      return;
    }

  
    this.hideMessages();


    const donorData = {
      fullName,
      email,
      phone: cleanPhone,
      address,
      donorCategory,
      reasonForCategory: reasonForDonation
    };

   
    this.http.post<any>('http://localhost:3000/donor', donorData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showConfirmation('Thank you for registering as a donor! We appreciate your willingness to help.');
          form.reset();
          setTimeout(() => {
            this.hideMessages();
            this.router.navigate(['/']); 
          }, 3000);
        } else {
          this.showError(response.message || 'Failed to register donor');
        }
      },
      error: (err) => {
        console.error('❌ Failed to register donor:', err);
        this.showError('Failed to register donor. Please check the server or ensure the database is running.');
      }
    });
  }

  private showConfirmation(message: string): void {
    const confirmationDiv = document.getElementById('confirmationMessage') as HTMLDivElement;
    confirmationDiv.textContent = message;
    confirmationDiv.style.display = 'block';
    (document.getElementById('errorMessage') as HTMLDivElement).style.display = 'none';
  }

  private showError(message: string): void {
    const errorDiv = document.getElementById('errorMessage') as HTMLDivElement;
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    (document.getElementById('confirmationMessage') as HTMLDivElement).style.display = 'none';
  }

  private hideMessages(): void {
    (document.getElementById('confirmationMessage') as HTMLDivElement).style.display = 'none';
    (document.getElementById('errorMessage') as HTMLDivElement).style.display = 'none';
  }
}
