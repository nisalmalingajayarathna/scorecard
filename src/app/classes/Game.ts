import { GameScore } from './GameScore';
export class Game {
    id: number;
    scores: GameScore;
    title: string;
    date: string;
    location: string;
    start_time: string;
    end_time: string;
    tournament: number;
}
