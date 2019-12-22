import { Team } from './../classes/Team';
export class AllUsers {
    id: number;
    is_online: boolean;
    user_type: string;
    team: Team;
    last_login: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
}
