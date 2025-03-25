import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Show } from "./show";

@Injectable({
    providedIn: 'root'
})
export class ShowService {
    readonly httpClient = inject(HttpClient);
    readonly baseUrl = "http://www.omdbapi.com/";
    readonly apiKey = "fb68863e";

    fetchAllShowsByTitleContaining(search: string): Observable<Show[]> {
        const fetchUrl = `${this.baseUrl}?apikey=${this.apiKey}&s=${search}`;
        return this.httpClient.get<any>(fetchUrl).pipe(
            map(response => response.Search || [])
        );
    }

    fetchShowById(id: string): Observable<Show> {
        const fetchUrl = `${this.baseUrl}?apikey=${this.apiKey}&i=${id}`;
        return this.httpClient.get<Show>(fetchUrl);
    }
}