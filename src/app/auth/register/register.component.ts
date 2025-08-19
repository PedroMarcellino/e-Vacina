import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwalService } from '../../services/utils/swal.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {

  name = '';
  email = '';
  password = '';
  password_confirmation = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private swalservice: SwalService,
  ) {}

     register() {
    this.auth.register({
      name: this.name,
      email: this.email,
      password: this.password,
      password_confirmation: this.password_confirmation
    }).subscribe({
      next: () => {
        this.swalservice.success('Registro concluído!', 'Agora faça login para acessar o sistema.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const msg = err.error?.message || 'Erro ao registrar usuário.';
        this.swalservice.error('Ops!', msg);
      }
    });
  }
}
