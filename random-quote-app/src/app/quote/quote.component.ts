import { Component, inject, OnInit } from '@angular/core';
import { QUOTES } from '../quotes';
import { Quote } from '../quote';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];
  quote: Quote | undefined;
  service = inject(QuotesService);

  ngOnInit(): void {
    this.service.getRandomQuote().subscribe((quotes) => {
      this.quotes = quotes;
      const quoteId = Math.floor(Math.random() * this.quotes.length);
      this.quote = this.quotes[quoteId];
    });
  }

  newQuote(): void {
    const quoteId = Math.floor(Math.random() * QUOTES.length)
    this.quote = this.quotes[quoteId];
  }
}
