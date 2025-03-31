import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  imports: [RouterModule],
  templateUrl: './nav-button.component.html'
})
export class NavButtonComponent {
    @Input() linkTo!: string;
    @Input() text!: string;
}
