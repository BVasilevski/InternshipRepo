import {Component, inject} from '@angular/core';
import {Show} from '../models/show';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ShowComponent} from '../show/show.component';
import {ShowService} from '../show.service';
import {forkJoin, mergeMap} from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, ShowComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  shows: Show[] = [];
  readonly showService = inject(ShowService);
  form = new FormGroup({
    title: new FormControl()
  });

  onFormSubmit() {
    const titleQuery = this.form.value.title;
    // 2 api calls because with the first fetch we don't fetch each show's actors, seasons etc
    this.showService.fetchAllShowsByTitleContaining(titleQuery).pipe(
      mergeMap((shows) => forkJoin(shows.map((show) => this.showService.fetchShowById(show.imdbID)))),
    ).subscribe((finalShows) => {
      this.shows = finalShows;
    })
  }
}
