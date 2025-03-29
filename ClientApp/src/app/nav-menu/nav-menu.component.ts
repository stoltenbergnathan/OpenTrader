import { Component, inject } from '@angular/core';
import { AddTradeModalComponent } from '../add-trade-modal/add-trade-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-menu',
  imports: [],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {
  private modalService = inject(NgbModal);

  openAddTradeModal() {
    this.modalService.open(AddTradeModalComponent);
  }

}
