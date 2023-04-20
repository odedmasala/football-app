import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leagues, Teams, TeamDisplay } from '../models/footballLeague.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class FetchFootballService {
  leagueName = new Subject<string>();
  constructor(private http: HttpClient) {}

  getLeagues = () => {
    const url = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
    return this.http.get<{ [key: string]: Leagues[] }>(url).pipe(
      map((responseData) => {
        let leagueArray: Leagues[] = [];
        leagueArray = responseData.leagues.slice(2, 7);
        return leagueArray;
      })
    );
  };

  getTeamsInLeague = (selectedLeagueName: string) => {
    const editLeagueName = selectedLeagueName.replaceAll(' ', '_');
    const url = `https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${editLeagueName}`;

    return this.http.get<{ [key: string]: Teams[] }>(url).pipe(
      map((responseData) => {
        let leagueArray: TeamDisplay[] = [];
        leagueArray = responseData.teams.map((team) => {
          return { strTeam: team.strTeam, strTeamBadge: team.strTeamBadge };
        });
        return leagueArray;
      })
    );
  };
}
