import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.css']
})
export class ViewInfoComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/adopter']);
  }
}
