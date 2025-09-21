import { VaccinesService } from './../services/vaccines/vaccines.service';
import { LeadsService } from './../services/leads/leads.service';
import { FamiliesService } from './../services/families/families.service';
import { SwalService } from './../services/utils/swal.service';
import { DashboardService } from './../services/dashboard/dashboard.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Vaccines } from '../../models/vaccines.model';
import { MatDialogContent } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from "@angular/material/dialog";
import { NgxMaskConfig, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ 
      MatDialogContent, 
      MatDialogActions, 
      NgxMaskPipe,
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  vaccinesCount: number = 0;
  lastVaccineName: string = '';
  familiesCount: number = 0;
  leadsCount: number = 0;
    
    constructor (
       private dashboardService: DashboardService,
       private swalService: SwalService,
       private familiesService: FamiliesService,
       private leadsService: LeadsService,
       private vaccinesService: VaccinesService
    ) {}

    ngOnInit(): void {
    this.loadLeadsCount()
    this.LoadFamiliesCount()
    this.LoadVaccinesCount()
    this.LoadLastVaccine()
  }

  loadLeadsCount() {
  this.leadsService.getLeadsCount().subscribe({
    next: (response: any) => {
      this.leadsCount = response.total;
    },
    error: (err) => {
      console.error('Erro ao carregar quantidade de leads', err);
    }
  });
}

    LoadFamiliesCount() {
      this.familiesService.getFamiliesCount().subscribe({
        next: (response: any) => {
          this.familiesCount = response.total;
        },
        error: (err) => {
          console.error('Erro ao pegar a quantidade total das familias', err);
        }
      });
    }

    LoadVaccinesCount() {
      this.vaccinesService.getVaccinesCount().subscribe({
        next: (reponse: any) => {
          this.vaccinesCount = reponse.total;
        },
        error: (err) => {
          console.error('Erro ao pegar o total das vacinas', err);
        }
      });
    }

    LoadLastVaccine() {
  this.vaccinesService.getLastVaccine().subscribe({
    next: (response: any) => {
      this.lastVaccineName = response?.data?.name || '-';
    },
    error: (err) => {
      console.error('Erro ao buscar última vacina', err);
    }
  });
}  
}
