import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Donor {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  donorCategory: string;
  reasonForCategory: string;
}

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DonorComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  errorMessage: string = '';
  donors: Donor[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  validateLogin(username: string, password: string): void {
   
    username = username?.trim() || '';
    password = password?.trim() || '';

    if (!username || !password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

  
    this.http.get<any>('http://localhost:3000/donor').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.donors = response.data;

          
          const validDonor = this.donors.find(
            (donor) =>
              donor.fullName.toLowerCase() === username.toLowerCase() &&
              donor.email.toLowerCase() === password.toLowerCase()
          );

          if (validDonor) {
            // Successful login
            localStorage.setItem('isDonorLoggedIn', 'true');
            this.errorMessage = '';
            this.usernameInput.nativeElement.value = '';
            this.passwordInput.nativeElement.value = '';
            this.router.navigate(['/donor-dashboard']);
          } else {
         
            this.errorMessage = 'Invalid username or password';
          }
        } else {
          this.errorMessage = response.message || 'Failed to validate credentials';
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch donors for login:', err);
        this.errorMessage = 'Failed to connect to the server. Please try again.';
      },
    });
  }
}
