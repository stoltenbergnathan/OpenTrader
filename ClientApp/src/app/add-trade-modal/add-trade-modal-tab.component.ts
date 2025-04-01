import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-add-trade-modal-tab',
    templateUrl: './add-trade-modal-tab.component.html',
})
export class AddTradeModalTabComponent {
    @Output() switchTabEvent = new EventEmitter<number>();

    activateTab(tab: number) {
        console.log("Emitting: ", tab)
        this.switchTabEvent.emit(tab);
    }
}