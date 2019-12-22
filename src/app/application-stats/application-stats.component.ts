import { BaseConstants } from './../constants/BaseConstants.enum';
import { APIServiceService } from './../services/API-service.service';
import { Component, OnInit } from '@angular/core';
import { AllUsers } from '../classes/AllUsers';

@Component({
  selector: 'app-application-stats',
  templateUrl: './application-stats.component.html',
  styleUrls: ['./application-stats.component.scss']
})
export class ApplicationStatsComponent implements OnInit {
  showError: boolean;

  allUsersList: Array<AllUsers>;
  interval: any;

  constructor(private apiService: APIServiceService) {
    this.showError = false;
  }

  ngOnInit() {
    this.getAllUsers();// get all users details initial call
  }

  /**
   * refresh user list to see latest updates
   */
  private startTimer() {
    this.interval = setInterval(() => {
      this.getAllUsers();// get all users details
    }, BaseConstants.ONLINE_SHEDULER_TIME);
  }

  /**
   * get all user's login details
   */
  private getAllUsers() {
    this.apiService.getAllUsers()
      .subscribe(response => {
        if (response && response.length > 0) {
          this.allUsersList = response;
          return;
        }

        this.showError = true;

        this.startTimer();// refresh user list to see latest updates
      }, error => {
        this.showError = true;

        this.startTimer();// refresh user list to see latest updates
      });
  }

}
