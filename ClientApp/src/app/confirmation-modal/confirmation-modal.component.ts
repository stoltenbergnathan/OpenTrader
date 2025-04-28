import { Component, Input } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  imports: [MatDialogModule],
  standalone: true,
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  @Input() confirmationText: string = '';

  constructor(private activeModal: MatDialogRef<ConfirmationModalComponent>) {}

  onConfirm() {
    this.activeModal.close('confirm');
  }

  onCancel() {
    this.activeModal.close();
  }
}
