import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'addt-modal-tab',
    templateUrl: './tab.component.html',
})
export class TabComponent {
    @Output() switchTabEvent = new EventEmitter<number>();

    activateTab(tab: number) {
        console.log("Emitting: ", tab)
        this.switchTabEvent.emit(tab);
    }
}