import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetService } from '../reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private resetService: ResetService
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  get newPassword() {
    return this.resetPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  setPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }
  
    this.resetService.setPassword(
      this.email.value,
      this.newPassword.value,
      this.confirmPassword.value
    ).subscribe({
      next: response => {
        console.log(response); 
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Error setting password:', error); 
        this.errorMessage = error.error.message; 
      }
    });
  }
}