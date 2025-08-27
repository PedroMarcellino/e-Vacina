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
      content: 'A vacinação deve ser realizada em um posto de saúde ou UBS, com todas as doses aplicadas nas idades previstas pelo calendário vacinal.',
      vaccines: [
        { name: 'BCG (Bacilo Calmette-Guerin)', description: 'Previne formas graves de tuberculose, principalmente miliar e meníngea.', dose: 'Dose única' },
        { name: 'Hepatite B', description: 'Previne a hepatite do tipo B.', dose: 'Dose única' },
        { name: 'Pentavalente (DTP/HB/Hib)', description: 'Previne difteria, tétano, coqueluche, hepatite B e meningite por Hib.', dose: '1ª dose' },
        { name: 'VIP (Poliomielite inativada)', description: 'Previne poliomielite ou paralisia infantil.', dose: '1ª dose' },
        { name: 'Pneumocócica 10V', description: 'Previne pneumonia, otite, meningite e outras doenças causadas pelo Pneumococo.', dose: '1ª dose' }
      ]
    },

    {
      title: 'Adolescente',
      age: 'Entre 11 e 19 anos',
      image: 'assets/img/jovem.png',
      content: 'Adolescentes precisam manter em dia vacinas como HPV, meningocócica e dT (tríplice bacteriana).',
      vaccines: [
        { name: 'HPV', description: 'Previne contra o Papilomavírus humano, que pode causar câncer de colo de útero e verrugas genitais.', dose: '2 doses' },
        { name: 'Meningocócica ACWY', description: 'Previne meningite e doenças meningocócicas graves.', dose: '1 dose' },
        { name: 'dT (tríplice bacteriana)', description: 'Previne difteria e tétano.', dose: 'Refórcos a cada 10 anos' }
      ]
    },

    {
      title: 'Adulto',
      age: 'Entre 20 e 59 anos',
      image: 'assets/img/adulto.png',
      content: 'Adultos devem atualizar vacinas como hepatite B, influenza anual e dT reforço a cada 10 anos.',
      vaccines: [
        { name: 'Hepatite B', description: 'Previne a hepatite tipo B.', dose: '3 doses (esquema completo)' },
        { name: 'dT (tríplice bacteriana)', description: 'Previne difteria e tétano.', dose: 'Reforço a cada 10 anos' },
        { name: 'Influenza', description: 'Previne gripe sazonal.', dose: '1 vez ao ano' }
      ]
    },

    {
      title: 'Gestante',
      age: 'Período gestacional',
      image: 'assets/img/gestante.png',
      content: 'Gestantes devem tomar vacinas específicas como dTpa (proteção contra coqueluche) e influenza.',
      vaccines: [
        { name: 'dTpa', description: 'Protege contra difteria, tétano e coqueluche.', dose: '1 dose a cada gestação (preferência 20ª a 36ª semana)' },
        { name: 'Influenza', description: 'Previne gripe sazonal.', dose: '1 vez ao ano, em qualquer período gestacional' },
        { name: 'Hepatite B', description: 'Previne a hepatite tipo B.', dose: 'Se não vacinada anteriormente, 3 doses' }
      ]
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
