import { CurrencyPipe, NgFor, NgIf, PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-option-stoploss',
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    CurrencyPipe,
    NgxCurrencyDirective,
    PercentPipe,
  ],
  templateUrl: './option-stoploss.component.html',
})
export class OptionStoplossComponent {
  optionPrice: number = 0;
  stopLossIncrements: number = 5;
  incrementsToShow: number = 2;

  /**
   * Calculates and returns an array of stop losses above the option price.
   */
  get stopsAbove(): number[] {
    if (!this.hasValidOptionPrice()) return [];
    return Array.from({ length: this.incrementsToShow }, (_, i) => {
      const cumulativeIncrement = (i + 1) * this.stopLossIncrements;
      return this.optionPrice + cumulativeIncrement / 100;
    }).reverse();
  }

  /**
   * Calculates and returns an array of stop losses below the option price.
   */
  get stopsBelow(): number[] {
    if (!this.hasValidOptionPrice()) return [];
    return Array.from({ length: this.incrementsToShow }, (_, i) => {
      const cumulativeIncrement = (i + 1) * this.stopLossIncrements;
      return this.optionPrice - cumulativeIncrement / 100;
    });
  }

  /**
   * Checks if the provided option price is valid.
   */
  hasValidOptionPrice(): boolean {
    return this.optionPrice > 0;
  }
}
