import { Component, inject, OnInit } from '@angular/core';
import { Quote } from '../quote';
import { QuotesService } from '../quotes.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css',
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({ opacity: 0, transform: 'translateY(-10px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('1s ease-in')),
      transition('visible => hidden', animate('0.5s ease-out'))
    ])
  ]
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  quote: Quote | undefined;
  service = inject(QuotesService);
  color = "";
  animationState = "hidden";

  ngOnInit(): void {
    this.service.getRandomQuote()
      .pipe(
        switchMap((quotes) => {
          this.quotes = quotes;
          this.animationState = "hidden";
          return timer(200);
        })
      )
      .subscribe(() => this.showRandomQuote());
  }

  newQuote(): void {
    this.animationState = "hidden";
    timer(200).subscribe(() => this.showRandomQuote());
  }

  showRandomQuote(): void {
    if (this.quotes.length > 0) {
      const quoteId = Math.floor(Math.random() * this.quotes.length);
      this.quote = this.quotes[quoteId];
      this.color = this.getRandomColor();
      this.animationState = "visible";
    }
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}
