import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwalService } from '../../services/utils/swal.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Users } from '../../../models/Users.model';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private swalservice: SwalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [''],
      cpf: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['']    
    });

   // console.log(this.form.value);
  }



  register() {
    this.auth.register({
      name: this.form.value.name,
      cpf: this.form.value.cpf,
      email: this.form.value.email,
      password: this.form.value.password,
      password_confirmation: this.form.value.password_confirmation
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

    console.log('Dados do form:',this.form.value);
  }
}
