import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Quote } from "./quote";

@Injectable({
    providedIn: 'root'
})
export class QuotesService {
    http = inject(HttpClient);

    getRandomQuote(): Observable<Quote[]> {
        return this.http.get<Quote[]>("http://localhost:8080/quotes");
    }
}