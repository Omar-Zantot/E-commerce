import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  /** `hold` error message from BE */
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private _Auth: AuthService, private _Router: Router) {}

  /**
   * Reactive Form Used to collect the form controls data with different validators:
   * - `name`: minLength 3 and maxLength 15. When catching an error, ensure that the letter 'l' is in lowercase.
   * - `email`: Should be a valid email address.
   * - `password` & `rePassword`: Should contain an uppercase letter (A-Z) followed by at least four lowercase letters or digits.
   * - `phone`: Should match the pattern /^(002)?(01)[0125][0-9]{8}.
   */

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z][a-z0-9]{4,}$'),
      ]),
      rePassword: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z][a-z0-9]{4,}$'),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(002)?(01)[0125][0-9]{8}'),
      ]),
    },
    { validators: this.rePasswordMatch }
  );

  rePasswordMatch(form: any) {
    // let password = form.controls['password'];
    let password = form.get('password');
    let rePassword = form.get('rePassword');
    if (password.value === rePassword.value) {
      return null;
    } else {
      rePassword.setErrors({
        rePasswordMatch: 'rePassword does not match the password',
      });
      return { rePasswordMatch: 'rePassword does not match the password' };
    }
  }

  signUp(registerForm: FormGroup) {
    this.isLoading = true;
    this._Auth.signUp(registerForm.value).subscribe({
      next: () => {
        this._Router.navigate(['/signin']);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;

        //  error.error.message = "Account Already Exists"
        //  error.error.message = "fail "
        //  error.error.errors.msg = "Password confirmation is incorrect"

        this.errorMessage =
          error.error.message == 'fail'
            ? error.error.errors.msg // "Password confirmation is incorrect" or "must be at least 6 chars"
            : error.error.message; // "Account Already Exists"
      },
      complete: () => {
        this.errorMessage = '';
        this.isLoading = false;
      },
    });
  }
}
