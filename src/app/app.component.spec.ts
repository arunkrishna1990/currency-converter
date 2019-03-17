import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CurrencyService } from './core/currency.service';
import { MaterialModule } from './shared/material.module';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatSelect } from '@angular/material';
import { formatCurrency, CurrencyPipe } from '@angular/common';
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>, component: AppComponent, mockCurrencyService;
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

  beforeEach(async(() => {
    mockCurrencyService = jasmine.createSpyObj('CurrencyService', ['getRates']);

    mockCurrencyService.getRates.and.returnValue(of(mockRates));
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [{ provide: CurrencyService, useValue: mockCurrencyService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('when the app component is compiled', () => {
    let baseCurrencySelector, targetCurrencySelector, baseCurrencyOptions, targetCurrencyOptions;
    beforeEach(() => {
      const matSelectors = fixture.debugElement.queryAll(By.directive(MatSelect));
      baseCurrencySelector = matSelectors[0].componentInstance as MatSelect;
      targetCurrencySelector = matSelectors[1].componentInstance as MatSelect;
      baseCurrencyOptions = baseCurrencySelector.options.toArray();
      targetCurrencyOptions = targetCurrencySelector.options.toArray();
    });

    it('should set the base currency default value to GBP', () => {
      expect(baseCurrencySelector.value).toEqual('GBP');
    });

    it('should render a list of currency names in base currency list', () => {
      expect(mockRates.length).toEqual(baseCurrencyOptions.length);

      for (let i = 0; i < baseCurrencyOptions.length; i++) {
        expect(mockRates[i].code).toEqual(baseCurrencyOptions[i].value);
      }
    });

    it('should render a list of currency names in target currency list', () => {
      expect(mockRates.length).toEqual(targetCurrencyOptions.length);

      for (let i = 0; i < targetCurrencyOptions.length; i++) {
        expect(mockRates[i].code).toEqual(targetCurrencyOptions[i].value.code);
      }
    });

    it('should render the list of currency code and the rate', () => {
      const currencyList = fixture.debugElement.queryAll(By.css('mat-list-item'));
      for (let i = 0; i < currencyList.length; i++) {
        const calculatedAmount = new CurrencyPipe(navigator.language)
          .transform(mockRates[i].rate, mockRates[i].code, 'code', '2.2-2');
        expect(currencyList[i].nativeElement.innerHTML).toContain(calculatedAmount);
      }
    });
  });

  describe('calculate', () => {
    it('should diplay the calculated amount', () => {
      const targetCurrencySelector = fixture.debugElement.queryAll(By.directive(MatSelect))[1].componentInstance as MatSelect;
      targetCurrencySelector.value = mockRates[2];
      const amountEntered = 10;
      fixture.debugElement.query(By.css('#enter-amount')).nativeElement.value = amountEntered;
      fixture.detectChanges();
      fixture.debugElement.query(By.css('button')).triggerEventHandler('click', null);
      fixture.detectChanges();
      const calculatedAmount = new CurrencyPipe(navigator.language)
        .transform(amountEntered * mockRates[2].rate, mockRates[2].code, 'code', '2.2-2');

      const expectedMessage = `Converted Amount: ${calculatedAmount}`;
      expect(fixture.debugElement.query(By.css('#converted-amount')).nativeElement.innerHTML).toEqual(expectedMessage);
    });
  });

  describe('onBaseCurrencyChanged', () => {
    it('should call currencyService.getRates with the changed base currency code', () => {
      const baseCurrencySelector = fixture.debugElement.queryAll(By.directive(MatSelect))[0].componentInstance as MatSelect;
      baseCurrencySelector.value = mockRates[2].code;
      fixture.debugElement.queryAll(By.css('mat-select'))[0].triggerEventHandler('selectionChange', { value: mockRates[2] });
      fixture.detectChanges();

      expect(mockCurrencyService.getRates).toHaveBeenCalledWith(mockRates[2].code);
    });
  });
});
