import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyService } from './core/currency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currencies$: Observable<string[]>;
  calculatedAmount = 0;
  default = 'GBP';
  locale = navigator.language;

  constructor(private currencyService: CurrencyService) {
    this.currencies$ = this.currencyService.getRates(this.default);
  }

  onBaseCurrencyChanged(selectedBaseCurrency: string) {
    this.currencies$ = this.currencyService.getRates(selectedBaseCurrency);
  }

  calculate(amount: number, selectedTargetRate: number) {
    this.calculatedAmount = amount * selectedTargetRate;
  }
}
