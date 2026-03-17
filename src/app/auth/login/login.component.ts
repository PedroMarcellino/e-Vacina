import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { SwalService } from '../../services/utils/swal.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective, NgxMaskPipe, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private swalService: SwalService
  ) {
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.swalService.success('Preencha todos os campos corretamente.');
      return;
    }

    this.loading = true;
    const { cpf, password } = this.loginForm.value;
  //  console.log('Dados do login:',cpf, password);

    this.authService.login(cpf, password).subscribe({
      next: () => {
        this.loading = false;
        this.swalService.success('Login realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.swalService.error(err.error?.message || 'Credenciais inválidas');
      }
    });
  }
}
