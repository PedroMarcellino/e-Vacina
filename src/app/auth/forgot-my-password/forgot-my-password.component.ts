import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-my-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot-my-password.component.html',
  styleUrl: './forgot-my-password.component.scss'
})
export class ForgotMyPasswordComponent {

  forgotForm: FormGroup;
  message: string | null = null;
  error: string | null = null;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.forgotForm.invalid) return;

    this.loading = true;
    this.message = null;
    this.error = null;

    const { email } = this.forgotForm.value;

    this.authService.forgotPassword(email).subscribe({
      next: (res) => {
        this.message = res.message || 'Link de recuperação enviado!';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Erro ao enviar link de recuperação.';
        this.loading = false;
      }
    });
  }
}

