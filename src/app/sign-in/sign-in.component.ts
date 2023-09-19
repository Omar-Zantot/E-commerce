import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private _Auth: AuthService, private _Router: Router) {}

  /**
   * Reactive Form Used to collect the form controls data with different validators:
   * - `email`: Should be a valid email address.
   * - `password` & `rePassword`: Should contain an uppercase letter (A-Z) followed by at least four lowercase letters or digits.
   */

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{4,}$'),
    ]),
  });

  signIn(signInForm: FormGroup) {
    this.isLoading = true;
    this._Auth.signIn(signInForm.value).subscribe({
      next: (response) => {
        if (response.message === 'success') {
          localStorage.setItem('userToken', response.token);
          this._Auth.decodedUserData();
          this._Router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error.message;
      },
      complete: () => {
        this.errorMessage = '';
        this.isLoading = false;
      },
    });
  }
}
