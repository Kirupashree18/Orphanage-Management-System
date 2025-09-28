import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showOptions: boolean = false; // To control the visibility of login options

  constructor(private router: Router) { }

  // Show login options
  showLoginOptions() {
    this.showOptions = true;
  }

  // Redirect to the respective page based on the role
  redirectTo(role: string) {
    this.router.navigate([role]); // Navigate to the selected role's page
  }
}
