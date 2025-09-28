import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

interface Orphan {
  orphanId: string;
  name: string;
  age: number;
  gender: string;
  health: string;
  adoption_status: string;
}

@Component({
  selector: 'app-orphan-details',
  templateUrl: './orphan-details.component.html',
  styleUrls: ['./orphan-details.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class OrphanDetailsComponent implements OnInit {
  orphans: Orphan[] = [];
  orphan: Orphan | null = null; 
  errorMessage: string = '';
  fromPage: string = 'staff'; 

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      this.fromPage = params['from'] || 'staff'; 
      console.log('From page set to:', this.fromPage); 
      this.fetchOrphans();
    });
  }

  fetchOrphans(): void {
    this.http.get<any>('http://localhost:3000/orphans').subscribe({
      next: (response) => {
        if (response.success) {
          this.orphans = response.data;
          this.errorMessage = '';
          console.log('📦 Orphans fetched:', this.orphans);
        } else {
          this.errorMessage = response.message || 'Unknown error';
          console.error('❌ Server error:', this.errorMessage);
        }
      },
      error: (err) => {
        console.error('❌ Failed to fetch orphans:', err);
        this.errorMessage = 'Failed to load orphans. Please check the server.';
        alert(this.errorMessage);
      }
    });
  }

  goBack(): void {
    console.log('Navigating back from:', this.fromPage); 
    if (this.fromPage === 'admin') {
      this.router.navigate(['/admin-dashboard']).then(success => {
        if (!success) {
          console.error('Navigation to /admin failed');
        }
      });
    } else {
      this.router.navigate(['/staff-dashboard']).then(success => {
        if (!success) {
          console.error('Navigation to /staff failed');
        }
      });
    }
  }
}
