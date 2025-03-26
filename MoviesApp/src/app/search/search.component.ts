import { Component, inject } from '@angular/core';
import { Show } from '../models/show';
import { FormControl, FormControlDirective, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ShowComponent } from '../show/show.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShowService } from '../show.service';
import { forkJoin } from 'rxjs';

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
    this.showService.fetchAllShowsByTitleContaining(titleQuery).subscribe((shows) => {
      const showRequests = shows.map((show) =>
        this.showService.fetchShowById(show.imdbID)
      );
      forkJoin(showRequests).subscribe((detailedShows) => {
        this.shows = detailedShows;
        console.log(this.shows);
      });
    });
  }
}
