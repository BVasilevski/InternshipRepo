import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { forkJoin, map, Observable } from "rxjs";
import { Show } from "./models/show";
import { ShowSeason } from "./models/show.season";

@Injectable({
    providedIn: 'root'
})
export class ShowService {
    readonly httpClient = inject(HttpClient);
    readonly baseUrl = "http://www.omdbapi.com/?apikey=fb68863e";

    fetchAllShowsByTitleContaining(search: string): Observable<Show[]> {
        const fetchUrl = `${this.baseUrl}&s=${search}`;
        return this.httpClient.get<any>(fetchUrl).pipe(
            map(response => response.Search || [])
        );
    }

    fetchShowById(id: string): Observable<Show> {
        const fetchUrl = `${this.baseUrl}&i=${id}`;
        return this.httpClient.get<Show>(fetchUrl);
    }

    fetchSeasonsForShowWithId(id: string, totalSeasons: number): Observable<ShowSeason[]> {
        const requests: Observable<ShowSeason>[] = [];
        for (let i = 1; i <= totalSeasons; i++) {
            const fetchUrl = `${this.baseUrl}&i=${id}&Season=${i}`;
            requests.push(this.httpClient.get<ShowSeason>(fetchUrl));
        }

        return forkJoin(requests); 
    }
}