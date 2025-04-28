import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavMenuComponent, TopNavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isSidebarOpen = false;
}
