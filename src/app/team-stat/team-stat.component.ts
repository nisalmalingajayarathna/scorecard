import { TeamScore } from './../classes/TeamScore';
import { GameScore } from './../classes/GameScore';
import { Team } from './../classes/Team';
import { APIServiceService } from './../services/API-service.service';
import { APIConstants } from './../constants/APIConstants.enum';
import { Component, OnInit } from '@angular/core';
import { Game } from '../classes/Game';

@Component({
  selector: 'app-team-stat',
  templateUrl: './team-stat.component.html',
  styleUrls: ['./team-stat.component.scss']
})
export class TeamStatComponent implements OnInit {
  baseUrl = APIConstants.BASE_URL;
  teamDetails: Array<Team>;
  gameDetails: Array<Game>;
  teamScoreDetails: Array<TeamScore>;

  selectedTeam: Team;
  selectedGame: Game;

  showError: boolean;

  constructor(private apiService: APIServiceService) { }

  ngOnInit() {
    this.getTeamData();// get all team details
  }

  /**
   * get selected team's scores
   */
  getTeamScores(selectedTeam: Team) {
    if (!selectedTeam) {
      this.showError = true;// show error alert
      return;
    }
    this.selectedTeam = selectedTeam;

    this.getTeamsAllScores(this.selectedTeam);// get all team scores

    this.apiService.getGamesDetailsByTeam(this.selectedTeam.id)
      .subscribe(result => {
        if (result && result.length > 0) {
          this.gameDetails = result;

          this.selectedGame = this.gameDetails[0];
          return;
        }

        this.gameDetails = null;
        this.selectedGame = null;
        this.showError = true;// show error alert
      }, error => {
        this.gameDetails = null;
        this.selectedGame = null;
        this.showError = true;// show error alert
      });
  }

  /**
   * get selected teams's all scores
   */
  private getTeamsAllScores(selectedTeam: Team) {

    this.apiService.getTeamScores()
      .subscribe(result => {
        if (result && result.length > 0) {
          this.teamScoreDetails = new Array();
          // filter out for selected game's score only
          result.forEach(element => {
            if (element.team === this.selectedTeam.id) {
              this.teamScoreDetails.push(element);
            }
          });

          if (this.teamScoreDetails && this.teamScoreDetails.length > 0) {
            return;
          }
        }

        this.teamScoreDetails = null;
        this.showError = true;// show error alert
      }, error => {
        this.teamScoreDetails = null;
        this.showError = true;// show error alert
      });
  }

  /**
   * load all team details
   */
  private getTeamData() {
    this.apiService.getTeamDetails()
      .subscribe(result => {
        if (result && result.length > 0) {
          this.teamDetails = result;

          this.selectedTeam = this.teamDetails[0];
          this.getTeamScores(this.selectedTeam);// get game details based on team
          return;
        }

        this.teamDetails = null;
        this.showError = true;// show error alert
      }, error => {
        this.teamDetails = null;
        this.showError = true;// show error alert
      });
  }

}
