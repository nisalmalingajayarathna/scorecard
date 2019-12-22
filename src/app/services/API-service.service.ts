import { Player } from './../classes/Player';
import { TeamScore } from './../classes/TeamScore';
import { GameScore } from './../classes/GameScore';
import { Team } from './../classes/Team';
import { AllUsers } from './../classes/AllUsers';
import { User } from './../classes/User';
import { BaseConstants } from './../constants/BaseConstants.enum';
import { Login } from '../classes/Login';
import { APIConstants } from './../constants/APIConstants.enum';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../classes/Game';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  LOGIN_URL = APIConstants.BASE_URL + '/o/token/';
  CURRENT_USER_URL = APIConstants.BASE_URL + '/current_user';
  ALL_USERS_URL = APIConstants.BASE_URL + '/user';
  GAMES_URL = APIConstants.BASE_URL + '/game';
  TEAMS_URL = APIConstants.BASE_URL + '/team';
  PLAYER_URL = APIConstants.BASE_URL + '/player';
  GAMES_SCORE_URL = APIConstants.BASE_URL + '/game_score';
  TEAMS_SCORE_URL = APIConstants.BASE_URL + '/team_score';
  ONLINE_SHEDULER_URL = APIConstants.BASE_URL + '/keep_user_online';

  interval: any;

  constructor(private http: HttpClient) {
  }

  /**
   * login with current user
   * @param userName current user's login user name
   * @param userPassword current user's login password
   */
  userLogin(userName: string, userPassword: string): Observable<Login> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(APIConstants.API_AUTH_CLIENT_ID + ':'
          + APIConstants.API_AUTH_CLIENT_SECRET)
      })
    };
    console.log('basic :' + btoa(APIConstants.API_AUTH_CLIENT_ID + ':'
      + APIConstants.API_AUTH_CLIENT_SECRET));

    // 'Content-Type': 'application/x-www-form-urlencoded',
    const formData = new FormData();
    formData.append('grant_type', 'password');
    formData.append('username', userName);
    formData.append('password', userPassword);

    return this.http.post<Login>(this.LOGIN_URL, formData, httpOptions);
  }

  /**
   * get current logged-in user's details
   */
  getCurrentUser(): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.CURRENT_USER_URL, this.getAuthHeader());
  }

  /**
   * get all user's details
   */
  getAllUsers(): Observable<Array<AllUsers>> {
    return this.http.get<Array<AllUsers>>(this.ALL_USERS_URL, this.getAuthHeader());
  }

  /**
   * get games summery
   */
  getGamesDetails(): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(this.GAMES_URL, this.getAuthHeader());
  }

  /**
   * get teams details
   */
  getTeamDetails(): Observable<Array<Team>> {
    return this.http.get<Array<Team>>(this.TEAMS_URL, this.getAuthHeader());
  }

  /**
   * get players details by team
   */
  getPlayerDetailsByTeam(teamId: number): Observable<Array<Player>> {
    return this.http.get<Array<Player>>(this.PLAYER_URL + '?team=' + teamId, this.getAuthHeader());
  }

  /**
   * get game scores
   */
  getGameScores(): Observable<Array<GameScore>> {
    return this.http.get<Array<GameScore>>(this.GAMES_SCORE_URL, this.getAuthHeader());
  }

  /**
   * get team scores
   */
  getTeamScores(): Observable<Array<TeamScore>> {
    return this.http.get<Array<TeamScore>>(this.TEAMS_SCORE_URL, this.getAuthHeader());
  }

  /**
   * get games by team id
   */
  getGamesDetailsByTeam(teamId: number): Observable<Array<Game>> {
    return this.http.get<Array<Game>>(this.GAMES_URL + "?game_score__team_id=" + teamId, this.getAuthHeader());
  }

  /**
   * start timer to send online status to the server periodically
   */
  startTimer() {
    this.interval = setInterval(() => {
      //set user online
      this.sendOnlineStatus().subscribe(res => { this.startTimer(); }
        , error => { this.startTimer(); });
    }, BaseConstants.ONLINE_SHEDULER_TIME);
  }



  /**
   * get games summery
   */
  private sendOnlineStatus(): Observable<any> {
    return this.http.get<any>(this.ONLINE_SHEDULER_URL, this.getAuthHeader());
  }

  /**
   * generate and return authentication header with user token
   */
  private getAuthHeader(): any {
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem(BaseConstants.LOCAL_STORAGE_ACCESS_TOKEN)
      })
    };
  }

}
