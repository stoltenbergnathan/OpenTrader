import { Component } from '@angular/core';
import { AddTradeModalComponent } from '../add-trade-modal/add-trade-modal.component';
import { NavButtonComponent } from './nav-button/nav-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-menu',
  imports: [NavButtonComponent, MatDialogModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  constructor(private dialog: MatDialog) {}

  openAddTradeModal() {
    this.dialog.open(AddTradeModalComponent, {width: '60%', maxWidth: 'none'});
  }

}
