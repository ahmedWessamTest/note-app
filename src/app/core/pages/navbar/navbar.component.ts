import { Component, inject, input, Input, InputSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, SubmitButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  layout: InputSignal<string> = input.required();
  private readonly _Router = inject(Router);

  logout(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);

  }
}
