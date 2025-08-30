import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private auth: AuthService, private route: Router){}

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  get form(){
    return this.loginForm.controls;
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value as any).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.user.userRole);
          this.auth.startLogoutCountdown();
          alert('Login Successfull');
          this.route.navigate(['/dashboard']);
        },
        error: (er) => alert('Credentials do not match')
      });
    }
  }
  toSignup(){
    this.route.navigate(['/auth/signup']);
  }
}
