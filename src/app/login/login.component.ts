import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginVisible: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showLogin(); 
  }

  showLogin() {
    this.isLoginVisible = true;
  }

  hideLogin() {
    this.isLoginVisible = false;
  }

  redirectToStaff() {
    this.router.navigate(['/staff-login']);
    this.hideLogin();
  }

  redirectToDonor() {
    this.router.navigate(['/donor-login']);
    this.hideLogin();
  }

  redirectToAdopter() {
    this.router.navigate(['/adopter-login']);
    this.hideLogin();
  }

  redirectToAdmin() {
    this.router.navigate(['/admin-login']);
    this.hideLogin();
  }
}
