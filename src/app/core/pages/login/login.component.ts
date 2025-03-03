import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../../shared/services/user-data.service';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _UserDataService = inject(UserDataService);



  loginForm!: FormGroup;
  errorMsg: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.loginForm = this._FormBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
    })
  }
  submitLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this._AuthService.postEmailLogin(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.msg === 'done') {
            this.isLoading.set(false);
            this.errorMsg.set('');
            localStorage.setItem('token', res.token);
            this._UserDataService.shareUserData();
            setTimeout(() => {
              this._Router.navigate(['/home'])
            }, 2000)
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMsg.set(err.error.msg);
          console.error("Error in register API", err)
        }
      })
    } else {
      this.loginForm.markAllAsTouched()
    }
  }
}
