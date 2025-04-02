import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'addt-modal-tab',
    imports: [NgClass],
    templateUrl: './tab.component.html',
})
export class TabComponent {
    @Output() switchTabEvent = new EventEmitter<number>();
    activeTab = 0;

    activateTab(tab: number) {
        this.activeTab = tab;
        this.switchTabEvent.emit(tab);
    }
}