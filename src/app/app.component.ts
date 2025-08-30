import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private auth: AuthService, private router: Router){}
  title = 'Patient Visit Manager';
  get token():string | null{
    return this.auth.getToken();
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
