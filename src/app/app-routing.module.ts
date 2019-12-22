import { HomeSummeryComponent } from './home-summery/home-summery.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { TeamStatComponent } from './team-stat/team-stat.component';
import { ApplicationStatsComponent } from './application-stats/application-stats.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'summery', pathMatch: 'full' },
      { path: 'summery', component: HomeSummeryComponent },
      { path: 'app-stat', component: ApplicationStatsComponent },
      { path: 'team-stat', component: TeamStatComponent },
      { path: 'player-stat', component: PlayerStatsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
