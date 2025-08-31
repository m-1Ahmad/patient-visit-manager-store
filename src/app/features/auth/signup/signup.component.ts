import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LettersOnlyDirective } from '../../../shared/Directives/letteronly.directive';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Signup } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, LettersOnlyDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  roles = [
    { value: 1, label: 'Admin' },
    { value: 2, label: 'Receptionist' },
    { value: 3, label: 'Doctor' }
  ];

  constructor(private store: Store, private router: Router) {}

  signupForm = new FormGroup({
    userFirstName: new FormControl('', [Validators.required]),
    userLastName: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required]),
    userRoleId: new FormControl(2, [Validators.required])
  });

  get form() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.store.dispatch(new Signup(this.signupForm.value as any)).subscribe({
        next: () => {
          alert('Signup success Please Login');
          this.router.navigate(['/auth/login']);
        },
        error: () => alert('Signup error')
      });
    }
  }

  toLogin() {
    this.router.navigate(['/auth/login']);
  }
}
