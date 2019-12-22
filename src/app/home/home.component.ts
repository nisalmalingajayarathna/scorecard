import { APIServiceService } from './../services/API-service.service';
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

  constructor(private router: Router, private location: Location, private apiService: APIServiceService) {

    // listen to router path changes
    router.events.subscribe((val) => {

      // if this is about navigation
      this.showBackButton = (val && val instanceof NavigationEnd
        && val.url && val.url.startsWith('/home/')
        && !val.url.startsWith('/home/summery'));

    });

  }

  ngOnInit() {
    this.apiService.startTimer();// start user online timer
  }

  /**
   * go back to the previous page
   */
  backClicked() {
    //this.location.back();
    this.router.navigate(['home']);
  }

  /**
   * logout from the current sesssion
   */
  logout() {
    this.router.navigate(['/']);
  }

}
