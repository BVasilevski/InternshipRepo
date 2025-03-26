import { Component, inject, Input } from '@angular/core';
import { Show } from '../models/show';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-show',
  imports: [RouterLink],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css'
})
export class ShowComponent {
  @Input() shows: Show[] = [];
}
