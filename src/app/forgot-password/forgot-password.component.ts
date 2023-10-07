import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private _Auth: AuthService, private _router: Router) {}

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verfiyForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });

  forgotPassword(forgotForm: FormGroup) {
    this._Auth.forgotPassword(forgotForm.value).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        document.querySelector('.forgotPassword')?.classList.add('d-none');
        document.querySelector('.verfiyCode')?.classList.remove('d-none');
      },
      error: (err) => {
        console.log(err);

        this.errorMessage = err.error.message;
      },
      complete: () => {
        this.errorMessage = '';
        this.successMessage = '';
      },
    });
  }

  verfiyCode(verfiyCode: FormGroup) {
    console.log(verfiyCode);
    this._Auth.verifyResetCode(verfiyCode.value).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        if (response.status == 'Success') {
          this._router.navigate(['/resetPassword']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
      },
    });
  }
}
