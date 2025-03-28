import { Component, inject, OnInit } from '@angular/core';
import { Show } from '../models/show';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ShowService } from '../show.service';

@Component({
  selector: 'app-show-details',
  imports: [RouterLink],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit {
  show?: Show | null;
  route = inject(ActivatedRoute)
  readonly service = inject(ShowService);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      mergeMap((id) => {
        if (!id) return [];
        return this.service.fetchShowById(id).pipe(
          mergeMap((show) => {
            if (!show.totalSeasons) {
              return [show];
            }
            return this.service.fetchSeasonsForShowWithId(show.imdbID, +show.totalSeasons).pipe(
              map((seasons) => {
                show.Seasons = seasons;
                return show;
              })
            );
          })
        );
      })
    ).subscribe((show) => {
      this.show = show;
    });
  }
}
