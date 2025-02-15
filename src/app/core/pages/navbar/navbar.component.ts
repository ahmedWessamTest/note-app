import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input({ required: true }) layout!: string;
  private readonly _Router = inject(Router)
  logout(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }
}
