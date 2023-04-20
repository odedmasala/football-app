import { Component, OnDestroy, OnInit } from '@angular/core';
import { FetchFootballService } from '../services/fetch-football.service';
import { Subscription } from 'rxjs';
import { TeamDisplay } from '../models/footballLeague.model';
@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent implements OnInit, OnDestroy {
  subLeagueName: Subscription;
  isLoading: boolean = false;
  teams: TeamDisplay[] = [];
  constructor(private leagueService: FetchFootballService) {}

  ngOnInit() {
    this.subLeagueName = this.leagueService.leagueName.subscribe(
      (leagueName) => {
        this.isLoading = true;
        this.leagueService.getTeamsInLeague(leagueName).subscribe((teams) => {
          this.teams = teams;
          this.isLoading = false;
        });
        if (!this.teams.length) this.isLoading = false;
      }
    );
  }
  ngOnDestroy() {
    this.subLeagueName.unsubscribe();
  }
}
