import { Component, inject, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../heroes.service';

@Component({
  selector: 'hero-details',
  imports: [],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit {
  hero: Hero | undefined;

  route = inject(ActivatedRoute);
  service = inject(HeroesService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hero = this.service.getHeroById(Number.parseInt(id!));
  }
}
