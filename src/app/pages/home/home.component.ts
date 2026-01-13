import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { SwalService } from '../../services/utils/swal.service';
import { LeadsService } from '../../services/leads/leads.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AboutComponent } from './shared/about/about.component';
import { InformationComponent } from './shared/information/information.component';
import { GetInTouchComponent } from './shared/get-in-touch/get-in-touch.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    HeaderComponent,
    FooterComponent,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    AboutComponent,
    InformationComponent,
    GetInTouchComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private leadsService: LeadsService,
    private swal: SwalService
  ) { }
}
