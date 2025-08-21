import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SwalService } from '../../services/utils/swal.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-vaccines',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './about-vaccines.component.html',
  styleUrl: './about-vaccines.component.scss'
})
export class AboutVaccinesComponent {
   selectedGroup: any = null;

  groups = [
    {
      title: 'Criança',
      age: 'Entre 0 e 10 anos',
      image: 'assets/img/criança.png',
      content: `
        A vacinação deve ser realizada em um posto de saúde ou UBS, 
        com todas as doses aplicadas nas idades previstas pelo calendário vacinal.
      `
    },
    {
      title: 'Adolescente',
      age: 'Entre 11 e 19 anos',
      image: 'assets/img/jovem.png',
      content: `
        Adolescentes precisam manter em dia vacinas como HPV, meningocócica e dT (tríplice bacteriana).
      `
    },
    {
      title: 'Adulto',
      age: 'Entre 20 e 59 anos',
      image: 'assets/img/adulto.png',
      content: `
        Adultos devem atualizar vacinas como hepatite B, influenza anual e dT reforço a cada 10 anos.
      `
    },
    {
      title: 'Gestante',
      age: 'Período gestacional',
      image: 'assets/img/gestante.png',
      content: `
        Gestantes devem tomar vacinas específicas como dTpa (proteção contra coqueluche) e influenza.
      `,
      
    },
    {
      title: 'Idoso',
      age: '60+ anos',
      image: 'assets/img/idoso.png',
      content: `
        Idosos devem se vacinar contra influenza, pneumococo e manter atualizadas as demais vacinas do calendário.
      `
    }
  ];

  selecionarGrupo(group: any) {
    this.selectedGroup = group;
  }

}
