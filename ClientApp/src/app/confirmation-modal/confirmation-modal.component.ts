import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  @Input() confirmationText: string = '';

  constructor(private activeModal: NgbActiveModal) {}

  onConfirm() {
    this.activeModal.close('confirm');
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
