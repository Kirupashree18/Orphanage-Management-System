import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.component.html',
  styleUrls: ['./child-details.component.css']
})
export class ChildDetailsComponent implements OnInit {
  orphans: any[] = [];

  constructor(public router: Router) {} 

  ngOnInit(): void {

    if (history.state.orphans) {
      this.orphans = history.state.orphans;
    } else {
      console.log('No orphan data found');
    }
  }
}
