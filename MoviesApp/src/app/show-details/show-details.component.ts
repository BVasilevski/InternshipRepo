import { Component, inject, OnInit } from '@angular/core';
import { Show } from '../show';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { map, mergeMap } from 'rxjs';
import { ShowService } from '../show.service';
import { JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-show-details',
  imports: [JsonPipe, RouterOutlet, NgFor],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.css'
})
export class ShowDetailsComponent implements OnInit {
  show?: Show | null;
  route = inject(ActivatedRoute)
  readonly service = inject(ShowService);

  ngOnInit(): void {
    console.log('show details component works!')
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      map((id) => {
        if (id) {
          return this.service.fetchShowById(id!)
        }
        return null;
      }),
      mergeMap((observable) => observable || []))
      .subscribe(show => {
        this.show = show;
        console.log(this.show);
      });
  }
}
