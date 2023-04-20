import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FetchFootballService } from '../services/fetch-football.service';
import { Leagues } from '../models/footballLeague.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-league-tabs',
  templateUrl: './league-tabs.component.html',
  styleUrls: ['./league-tabs.component.scss'],
})
export class LeagueTabsComponent {
  loadedLeague: Leagues[] = [];
  leagueMarker: string = '';
  constructor(private leagueService: FetchFootballService) {}

  ngOnInit(): void {
    this.getLoadedLeague();
  }

  getLoadedLeague() {
    return this.leagueService.getLeagues().subscribe((data) => {
      this.loadedLeague = data;
    });
  }

  onSelectLeague(leagueName: string) {
    if (this.leagueMarker == leagueName) return;
    this.leagueMarker = leagueName;
    this.leagueService.leagueName.next(leagueName);
  }
}
