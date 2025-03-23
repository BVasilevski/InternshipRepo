import { Injectable } from "@angular/core";
import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";

@Injectable({
    providedIn: 'root',
})
export class HeroesService {

    getHeroes(): Hero[] {
        return HEROES;
    }

    getHeroById(id: number): Hero | undefined {
        return this.getHeroes().find(h => h.id === id) ?? undefined;
    }

    getTopNHeroes(n: number = 4) {
        return this.getHeroes().slice(0, n);
    }
}