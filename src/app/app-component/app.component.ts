import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  showAboutSection = false;
  showContactSection = false;
  showLocationSection = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Subscribe to route changes to add/remove a class on the body
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects === '/') {
          document.body.classList.add('home-route');
          document.body.classList.remove('login-route');
        } else if (event.urlAfterRedirects === '/login') {
          document.body.classList.add('login-route');
          document.body.classList.remove('home-route');
        }
      }
    });
  }

  toggleAbout(event: Event): void {
    event.preventDefault();
    this.showAboutSection = !this.showAboutSection;
    if (this.showContactSection) this.showContactSection = false;
    if (this.showLocationSection) this.showLocationSection = false;
  }

  toggleContact(event: Event): void {
    event.preventDefault();
    this.showContactSection = !this.showContactSection;
    if (this.showAboutSection) this.showAboutSection = false;
    if (this.showLocationSection) this.showLocationSection = false;
  }

  toggleLocation(event: Event): void {
    event.preventDefault();
    this.showLocationSection = !this.showLocationSection;
    if (this.showAboutSection) this.showAboutSection = false;
    if (this.showContactSection) this.showContactSection = false;
  }
}
