import { BaseConstants } from './../constants/BaseConstants.enum';
import { APIServiceService } from './../services/API-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;

  loadingVisibility: boolean;
  isLoginSuccessful: number;

  constructor(private router: Router, private apiService: APIServiceService) {
    this.loadingVisibility = false;
    this.isLoginSuccessful = 0;
  }

  ngOnInit() {
  }

  /**
   * start login process
   */
  login() {
    if (!this.userName || !this.userPassword) {
      this.isLoginSuccessful = 2;
      return;
    }

    this.loadingVisibility = true;// show progress view

    this.apiService.userLogin(this.userName, this.userPassword)
      .subscribe(response => {
        if (response) {
          // save data
          localStorage.setItem(BaseConstants.LOCAL_STORAGE_CURRENT_USER_NAME, this.userName);
          localStorage.setItem(BaseConstants.LOCAL_STORAGE_ACCESS_TOKEN, response.access_token);
          localStorage.setItem(BaseConstants.LOCAL_STORAGE_REFRESH_TOKEN, response.refresh_token);

          this.getUserData();// get current user data

          return;
        }

        this.isLoginSuccessful = 2;
        this.loadingVisibility = false;// hide progress view
      }, error => {
        this.isLoginSuccessful = 2;
        this.loadingVisibility = false;// hide progress view
      });

  }

  /**
   * get current user's details
   */
  getUserData() {
    this.apiService.getCurrentUser()
      .subscribe(response => {
        if (response && response.length > 0) {

          response.forEach(element => {
            if (element.username === localStorage.getItem(BaseConstants.LOCAL_STORAGE_CURRENT_USER_NAME)) {

              // save data
              localStorage.setItem(BaseConstants.LOCAL_STORAGE_USER_TYPE, response[0].user_type);

              this.isLoginSuccessful = 1;
              this.router.navigate(['home']);
              this.loadingVisibility = false;// hide progress view
              return;
            }
          });
        }

        this.isLoginSuccessful = 2;
        this.loadingVisibility = false;// hide progress view
      }, error => {
        this.isLoginSuccessful = 2;
        this.loadingVisibility = false;// hide progress view
      });
  }


}
