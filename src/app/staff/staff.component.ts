import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

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
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class StaffComponent {
  @ViewChild('usernameInput') usernameInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;

  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  validateLogin(username: string, password: string): void {
   
    username = username.trim();
    password = password.trim();

    if (!username || !password) {
      this.errorMessage = 'Please enter both username and password';
      return;
    }

  
    this.http.get<any>('http://localhost:3000/staff').subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const staff: Staff[] = response.data;

        
          const validStaff = staff.find(
            (staffMember) =>
              staffMember.name.toLowerCase() === username.toLowerCase() &&
              staffMember.id === password
          );

          if (validStaff) {
            // Successful login
            localStorage.setItem('isStaffLoggedIn', 'true');
            this.errorMessage = '';
            this.usernameInput.nativeElement.value = '';
            this.passwordInput.nativeElement.value = '';
            this.router.navigate(['/staff-dashboard']);
          } else {
            // Invalid credentials
            this.errorMessage = 'Invalid username or password';
          }
        } else {
          this.errorMessage = response.message || 'Failed to validate credentials';
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch staff for login:', err);
        this.errorMessage = 'Failed to connect to the server. Please try again.';
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/login']); 
  }
}
