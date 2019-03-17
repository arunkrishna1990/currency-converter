import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly BASE_URL = 'https://api.exchangeratesapi.io/latest';

  constructor(private http: HttpClient) { }

  getRates(code: string) {
    return this.http.get(`${this.BASE_URL}?base=${code}`).pipe(
      map((response: ExchangeRateResponse) => {
        const rates = response.rates;
        const currenciesRate = [];
        for (const key in rates) {
          if (rates.hasOwnProperty(key)) {
            currenciesRate.push(new Rate(key, rates[key]));
          }
        }
        return currenciesRate;
      })
    );
  }
}

export class Rate {
  constructor(public code: string, public rate: number) {

  }
}

interface ExchangeRateResponse {
  base: string;
  rates: any;
}
