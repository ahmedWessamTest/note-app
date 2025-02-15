import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../../shared/services/user-data.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _UserDataService = inject(UserDataService);



  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    })
  }
  errorMsg: string = '';
  isLoading = false;
  submitLogin(): void {
    this.isLoading = true;
    this._AuthService.postEmailLogin(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.msg === 'done') {
          this.isLoading = false;
          this.errorMsg = '';
          localStorage.setItem('token', res.token);
          this._UserDataService.shareUserData();
          setTimeout(() => {
            this._Router.navigate(['/home'])
          }, 2000)
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMsg = err.error.msg;
        console.error("Error in register API", err)
      }
    })
  }
}
