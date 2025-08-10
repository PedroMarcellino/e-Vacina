import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  
  form = {
    name: '',
    email: '',
    phone: '',
    password: '',
  }

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.form).subscribe({
      next: res => {
        alert('Registro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error(err);
        alert('Erro ao registrar');
      }
    });
  }
}
