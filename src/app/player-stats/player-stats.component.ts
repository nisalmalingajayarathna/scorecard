import { Team } from './../classes/Team';
import { APIServiceService } from './../services/API-service.service';
import { APIConstants } from './../constants/APIConstants.enum';
import { Component, OnInit } from '@angular/core';
import { Player } from '../classes/Player';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  baseUrl = APIConstants.BASE_URL;
  teamDetails: Array<Team>;
  playerDetails: Array<Player>;

  selectedTeam: Team;

  showError: boolean;

  constructor(private apiService: APIServiceService) { }

  ngOnInit() {
    this.getTeamData();// get all team details
  }

  /**
   * get players by team
   */
  private getPlayersByTeam(team: Team) {
    if (!team) {
      this.showError = true;
      return;
    }

    this.selectedTeam = team;

    this.apiService.getPlayerDetailsByTeam(this.selectedTeam.id)
      .subscribe(result => {
        if (result && result.length > 0) {
          this.playerDetails = result;
          return;
        }

        this.playerDetails = null;
        this.showError = true;// show error alert
      }, error => {
        this.playerDetails = null;
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
          this.getPlayersByTeam(this.selectedTeam);// get initail players data
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
