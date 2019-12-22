import { APIConstants } from './../constants/APIConstants.enum';
import { APIServiceService } from './../services/API-service.service';
import { Component, OnInit } from '@angular/core';
import { Game } from '../classes/Game';
import { Player } from '../classes/Player';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss']
})
export class SummeryComponent implements OnInit {
  baseUrl = APIConstants.BASE_URL;
  gamesDetails: Array<Game>;

  playerDetailsTeam1: Array<Player>;
  playerDetailsTeam2: Array<Player>;

  selectedGame: Game;

  showError: boolean;

  constructor(private apiService: APIServiceService) {
    this.showError = false;
  }

  ngOnInit() {
    this.getGameDetails();// get latest game summery
  }

  loadGameDetails(game: Game) {
    if (!game) {
      this.showError = true;// show error alert
      return;
    }

    this.selectedGame = game;
    this.getPlayersByTeam();// get players in the selected teams
  }

  /**
   * get players by team
   */
  private getPlayersByTeam() {
    if (!this.selectedGame) {
      this.showError = true;
      return;
    }

    this.apiService.getPlayerDetailsByTeam(this.selectedGame.scores[0].team)
      .subscribe(result => {
        if (result && result.length > 0) {
          this.playerDetailsTeam1 = result;
          return;
        }

        this.playerDetailsTeam1 = null;
        this.showError = true;// show error alert
      }, error => {
        this.playerDetailsTeam1 = null;
        this.showError = true;// show error alert
      });

    this.apiService.getPlayerDetailsByTeam(this.selectedGame.scores[1].team)
      .subscribe(result => {
        if (result && result.length > 0) {
          this.playerDetailsTeam2 = result;
          return;
        }

        this.playerDetailsTeam2 = null;
        this.showError = true;// show error alert
      }, error => {
        this.playerDetailsTeam2 = null;
        this.showError = true;// show error alert
      });
  }

  /**
   * get latest game summery
   */
  private getGameDetails() {
    this.apiService.getGamesDetails()
      .subscribe(response => {
        if (response && response.length > 0) {
          this.gamesDetails = response;
          return;
        }

        this.showError = true;// show error alert
      }, error => {
        this.showError = true;// show error alert
      });
  }

}
