import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  token = this.route.snapshot.queryParamMap.get('token') || '';
  email = this.route.snapshot.queryParamMap.get('email') || '';

  form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required]],
  });

  loading = false;
  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  submit() {
    this.message = '';
    this.error = '';
    if (this.form.invalid) return;

    const { password, password_confirmation } = this.form.value;

    this.loading = true;
    this.auth.resetPassword({
      email: this.email,
      token: this.token,
      password: password!,
      password_confirmation: password_confirmation!,
    }).subscribe({
      next: () => {
        this.message = 'Senha redefinida com sucesso!';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (e) => {
        this.error = e?.error?.message || 'Erro ao redefinir senha.';
        this.loading = false;
      }
    });
  }
}
