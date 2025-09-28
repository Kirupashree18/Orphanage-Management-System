import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-type',
  templateUrl: './family-type.component.html',
  styleUrls: ['./family-type.component.css']
})
export class FamilyTypeComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/adopter']); 
  }
}
