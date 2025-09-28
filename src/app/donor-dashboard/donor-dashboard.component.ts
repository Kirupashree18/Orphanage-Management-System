import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donor-dashboard',
  templateUrl: './donor-dashboard.component.html',
  styleUrls: ['./donor-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DonorDashboardComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {

    const isDonorLoggedIn = localStorage.getItem('isDonorLoggedIn');
    if (isDonorLoggedIn !== 'true') {
      this.router.navigate(['/donor']);
    }
  }

  logout(): void {
    localStorage.removeItem('isDonorLoggedIn');
    this.router.navigate(['/donor']);
  }
}
