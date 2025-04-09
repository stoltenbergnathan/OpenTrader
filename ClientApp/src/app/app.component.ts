import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { TopNavbarComponent } from './navbar/navbar.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMenuComponent, TopNavbarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isSidebarOpen = false;
  screenIsSmall = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenIsSmall = window.innerWidth < 768;
  }

  ngOnInit() {
    this.screenIsSmall = window.innerWidth < 768;
  }
}