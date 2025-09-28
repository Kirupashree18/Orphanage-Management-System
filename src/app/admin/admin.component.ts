import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
})
export class AdminComponent {
  errorMessage: string = '';

  constructor(private router: Router) {}

  validateLogin(username: string, password: string): void {
    if (username === 'admin' && password === '123') {
      localStorage.setItem('isLoggedIn', 'true');
      this.errorMessage = '';
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  goBack(): void {
    this.router.navigate(['/login']); 
  }
}
