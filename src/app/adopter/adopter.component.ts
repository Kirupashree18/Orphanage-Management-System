import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adopter',
  templateUrl: './adopter.component.html',
  styleUrls: ['./adopter.component.css']
})
export class AdopterComponent {
  constructor(private router: Router) {}

  navigateToFamilyType() {
    this.router.navigate(['/family-type']);
  }

  navigateToApplyAdoption() {
    this.router.navigate(['/apply-adoption']);
  }

  navigateToViewInfo() {
    this.router.navigate(['/view-info']);
  }
  goBack() {
    this.router.navigate(['/login']); 
  }
}
