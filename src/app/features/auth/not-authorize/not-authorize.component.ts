import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-authorize',
  standalone: true,
  imports: [],
  templateUrl: './not-authorize.component.html',
  styleUrl: './not-authorize.component.scss'
})
export class NotAuthorizeComponent {
  constructor(private router: Router){}
  backToHome(){
    this.router.navigate(['']);
  }
}
