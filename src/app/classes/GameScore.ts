import { Team } from './../classes/Team';
export class GameScore {
    id: number;
    team_details: Team;
    q1: number;
    q2: number;
    q3: number;
    q4: number;
    is_win: boolean;
    game: number;
    team: number;
}
