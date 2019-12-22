import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showBackButton: boolean;

  constructor(private router: Router, private location: Location) {

    // listen to router path changes
    router.events.subscribe((val) => {

      // if this is about navigation
      if (val instanceof NavigationEnd) {

      }

    });

  }

  ngOnInit() {
  }

  /**
   * go back to the previous page
   */
  backClicked() {
    this.location.back();
  }

}
