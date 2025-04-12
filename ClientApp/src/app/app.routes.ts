import { Routes } from '@angular/router';
import { TradeListComponent } from './trade-list/trade-list.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';

export const routes: Routes = [
  {
    path: '',
    component: TradeListComponent,
  },
  {
    path: 'tools',
    component: ToolMenuComponent,
  },
];
