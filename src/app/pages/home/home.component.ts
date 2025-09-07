import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/header/footer/footer.component';
import { SwalService } from '../../services/utils/swal.service';
import { LeadsService } from '../../services/leads/leads.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, 
    HeaderComponent, 
    FooterComponent, 
    FormsModule, 
    NgxMaskDirective, 
    NgxMaskPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  form = {
    full_name: '',
    email: '',
    phone: '',
    message: ''
  };

  constructor(
    private leadsService: LeadsService,
    private swal: SwalService
  ) {}

  sendContactMessage() {
    this.leadsService.create(this.form).subscribe({
      next: () => {
        this.swal.success('Mensagem enviada!', 'Entraremos em contato em breve.');
        this.form = { full_name: '', email: '', phone: '', message: '' };
      },
      error: () => {
        this.swal.error('Erro ao enviar', 'Não foi possível enviar a mensagem. Tente novamente.');
      }
    });
  }
}
