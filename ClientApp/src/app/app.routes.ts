import { Routes } from '@angular/router';
import { TradeListComponent } from './trade-list/trade-list.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';
import { OptionStoplossComponent } from './tool-menu/option-stoploss/option-stoploss.component';

export const routes: Routes = [
  {
    path: '',
    component: TradeListComponent,
  },
  {
    path: 'tools',
    component: ToolMenuComponent,
    children: [
      { path: 'option-stop-loss', component: OptionStoplossComponent },
    ],
  },
];
