import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';
import { HeroesService } from '../heroes.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'heroes',
  imports: [RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  @Output() selectedHero = new EventEmitter<Hero>();
  service = inject(HeroesService);

  ngOnInit(): void {
    this.heroes = this.service.getHeroes();
  }

  onHero(hero: Hero) {
    this.selectedHero.emit(hero);
  }
}
