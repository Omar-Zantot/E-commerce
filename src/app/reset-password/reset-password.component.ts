import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private _Auth: AuthService, private _Router: Router) {}

  resetForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[A-Z][a-z0-9]{4,}$'),
    ]),
  });

  resetPassword(resetForm: FormGroup) {
    this.isLoading = true;
    this._Auth.resetPassword(resetForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.token) {
          this._Router.navigate(['/signin']);
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
