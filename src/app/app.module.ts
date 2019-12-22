import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SummeryComponent } from './summery/summery.component';
import { ApplicationStatsComponent } from './application-stats/application-stats.component';
import { TeamStatComponent } from './team-stat/team-stat.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { HomeSummeryComponent } from './home-summery/home-summery.component';

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      SummeryComponent,
      ApplicationStatsComponent,
      TeamStatComponent,
      PlayerStatsComponent,
      HomeSummeryComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
