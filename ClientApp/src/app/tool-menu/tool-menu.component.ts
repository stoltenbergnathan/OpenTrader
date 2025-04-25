import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tool-menu',
  imports: [NgFor, RouterLink, RouterOutlet],
  templateUrl: './tool-menu.component.html',
})
export class ToolMenuComponent {
  tools: string[] = ['option-stop-loss'];
}
