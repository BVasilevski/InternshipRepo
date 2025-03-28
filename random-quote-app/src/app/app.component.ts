import { Component } from '@angular/core';
import { QuoteComponent } from './quote/quote.component';

@Component({
  selector: 'app-root',
  imports: [QuoteComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'random-quote-app';
}
