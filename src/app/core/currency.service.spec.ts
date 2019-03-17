import { TestBed, inject } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { of } from 'rxjs';

describe('CurrencyService', () => {
  let currencyService: CurrencyService, mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpCLient', ['get']);
    currencyService = new CurrencyService(mockHttpClient);
  });

  describe('getRates', () => {
    it('should return an observable array of rates', () => {
      const dummyCode = 'GBP';
      const mockResponse = {
        rates: {
          MXN: 25.5021951648,
          AUD: 1.8718023766,
          HKD: 10.3923198501,
          RON: 5.5686940233,
          HRK: 8.6858280162,
          CHF: 1.3299771703,
          IDR: 18899.8419481356,
          CAD: 1.7699467307,
          USD: 1.3238892466,
          JPY: 147.7023941931,
          BRL: 5.1016800328,
          PHP: 69.6493590119,
          CZK: 30.050927823,
          NOK: 11.3422700931,
          INR: 91.4054908388,
          PLN: 5.0399812679,
          ISK: 155.5932798689,
          MYR: 5.4054908388,
          ZAR: 19.1748521922,
          ILS: 4.7659076275,
          GBP: 1.0
        }, base: 'GBP'
      };
      const mockRates = [{
        code: 'MXN', rate: 25.5021951648
      }, {
        code: 'AUD', rate: 1.8718023766
      }, {
        code: 'HKD', rate: 10.3923198501
      }, {
        code: 'RON', rate: 5.5686940233
      }, {
        code: 'HRK', rate: 8.6858280162
      }, {
        code: 'CHF', rate: 1.3299771703
      }, {
        code: 'IDR', rate: 18899.8419481356
      }, {
        code: 'CAD', rate: 1.7699467307
      }, {
        code: 'USD', rate: 1.3238892466
      }, {
        code: 'JPY', rate: 147.7023941931
      }, {
        code: 'BRL', rate: 5.1016800328
      }, {
        code: 'PHP', rate: 69.6493590119
      }, {
        code: 'CZK', rate: 30.050927823
      }, {
        code: 'NOK', rate: 11.3422700931
      }, {
        code: 'INR', rate: 91.4054908388
      }, {
        code: 'PLN', rate: 5.0399812679
      }, {
        code: 'ISK', rate: 155.5932798689
      }, {
        code: 'MYR', rate: 5.4054908388
      }, {
        code: 'ZAR', rate: 19.1748521922
      }, {
        code: 'ILS', rate: 4.7659076275
      }, {
        code: 'GBP', rate: 1
      }];

      mockHttpClient.get.and.returnValue(of(mockResponse));

      currencyService.getRates(dummyCode).subscribe(response => {
        for (let i = 0; i < mockRates.length; i++) {
          expect(response[i].code).toEqual(mockRates[i].code);
          expect(response[i].rate).toEqual(mockRates[i].rate);
        }
      });
    });
  });
});
