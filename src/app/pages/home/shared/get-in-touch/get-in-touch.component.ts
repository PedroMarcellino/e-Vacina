import { SwalService } from './../../../../services/utils/swal.service';
import { LeadsService } from './../../../../services/leads/leads.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AppIconComponent } from '../../../../../shared/icon/icon.component';

@Component({
  selector: 'app-get-in-touch',
  standalone: true,
  imports: [
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    CommonModule,
    ReactiveFormsModule,
    AppIconComponent
  ],
  templateUrl: './get-in-touch.component.html',
  styleUrl: './get-in-touch.component.scss'
})
export class GetInTouchComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leadsService: LeadsService,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  sendContactMessage() {
    this.leadsService.create(this.form).subscribe({
      next: () => {
        this.swal.success('Mensagem enviada!', 'Entraremos em contato em breve.');
        // this.form = { full_name: '', email: '', phone: '', message: '' };
      },
      error: () => {
        this.swal.error('Erro ao enviar', 'Não foi possível enviar a mensagem. Tente novamente.');
      }
    });
  }


}
