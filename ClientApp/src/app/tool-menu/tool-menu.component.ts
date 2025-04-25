import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface Tool {
  path: string;
  label: string;
}
@Component({
  selector: 'app-tool-menu',
  standalone: true,
  imports: [NgFor, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './tool-menu.component.html',
})
export class ToolMenuComponent {
  tools: Tool[] = [{ path: 'option-stop-loss', label: 'Option Stop Loss' }];
}
