import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthState } from './core/store/auth/auth.state';
import { Logout } from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Patient Visit Manager';

  @Select(AuthState.token) token$!: Observable<string | null>;
  @Select(AuthState.role) role$!: Observable<string | null>;
  
  constructor(private store: Store, private router: Router) {}

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/auth/login']);
  }
}
