import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-regiser',
  imports: [ReactiveFormsModule],
  templateUrl: './regiser.component.html',
  styleUrl: './regiser.component.css'
})
export class RegiserComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);


  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      age: [null, [Validators.required, Validators.min(3), Validators.max(130)]],
      phone: [null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]],
    })
  }
  errorMsg: string = '';
  isLoading = false;
  submitRegister(): void {
    this.isLoading = true;
    this._AuthService.postEmail(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.msg === 'done') {
          this.isLoading = false;
          this.errorMsg = '';
          setTimeout(() => {
            this._Router.navigate(['/login'])
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
