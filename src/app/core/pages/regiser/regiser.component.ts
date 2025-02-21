import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SubmitButtonComponent } from "../../../shared/components/ui/submit-button/submit-button.component";
@Component({
  selector: 'app-regiser',
  imports: [ReactiveFormsModule, SubmitButtonComponent],
  templateUrl: './regiser.component.html',
  styleUrl: './regiser.component.css'
})
export class RegiserComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);


  registerForm!: FormGroup;
  errorMsg: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.registerForm = this._FormBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      age: [null, [Validators.required, Validators.min(3), Validators.max(130)]],
      phone: [null, [Validators.required, Validators.pattern(/^01(0|1|2|5)[0-9]{8}$/)]],
    })
  }
  submitRegister(): void {

    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this._AuthService.postEmail(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.msg === 'done') {
            this.isLoading.set(false);
            this.errorMsg.set('');
            setTimeout(() => {
              this._Router.navigate(['/login'])
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
      this.registerForm.markAllAsTouched();

    }
  }

}
