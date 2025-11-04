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
        { name: 'BCG (Bacilo Calmette-Guerin)', description: 'Previne formas graves de tuberculose, principalmente miliar e meníngea.', dose: 'Dose única ao nascer' },
        { name: 'Hepatite B', description: 'Previne a hepatite do tipo B.', dose: '1ª dose ao nascer' },
        { name: 'Pentavalente (DTP/HB/Hib)', description: 'Previne difteria, tétano, coqueluche, hepatite B e meningite por Hib.', dose: '1ª dose aos 2 meses' },
        { name: 'VIP (Poliomielite inativada)', description: 'Previne poliomielite (paralisia infantil).', dose: '1ª dose aos 2 meses' },
        { name: 'Pneumocócica 10V', description: 'Previne pneumonia, otite, meningite e outras doenças causadas pelo Pneumococo.', dose: '1ª dose aos 2 meses' },
        { name: 'Rotavírus humano', description: 'Previne diarreia causada por rotavírus.', dose: '1ª dose aos 2 meses' },
        { name: 'Meningocócica C (conjugada)', description: 'Previne meningite e outras infecções causadas pela bactéria meningococo C.', dose: '1ª dose aos 3 meses' },
        { name: 'Pentavalente (DTP/HB/Hib)', description: 'Reforço da prevenção contra difteria, tétano, coqueluche, hepatite B e Hib.', dose: '2ª dose aos 4 meses' },
        { name: 'VIP (Poliomielite inativada)', description: 'Reforço da prevenção contra poliomielite.', dose: '2ª dose aos 4 meses' },
        { name: 'Pneumocócica 10V', description: 'Reforço da prevenção contra doenças pneumocócicas.', dose: '2ª dose aos 4 meses' },
        { name: 'Rotavírus humano', description: 'Reforço da prevenção contra diarreia por rotavírus.', dose: '2ª dose aos 4 meses' },
        { name: 'Meningocócica C (conjugada)', description: 'Reforço da prevenção contra meningite meningocócica.', dose: '2ª dose aos 5 meses' },
        { name: 'Pentavalente (DTP/HB/Hib)', description: 'Última dose do esquema primário contra difteria, tétano, coqueluche, hepatite B e Hib.', dose: '3ª dose aos 6 meses' },
        { name: 'VIP (Poliomielite inativada)', description: 'Última dose do esquema primário contra poliomielite.', dose: '3ª dose aos 6 meses' },
        { name: 'Febre amarela', description: 'Previne febre amarela.', dose: '1ª dose aos 9 meses' },
        { name: 'Pneumocócica 10V', description: 'Reforço final da prevenção contra doenças pneumocócicas.', dose: 'Reforço aos 12 meses' },
        { name: 'Meningocócica C (conjugada)', description: 'Reforço final da prevenção contra meningite meningocócica.', dose: 'Reforço aos 12 meses' },
        { name: 'Tríplice viral (sarampo, caxumba e rubéola - SCR)', description: 'Previne sarampo, caxumba e rubéola.', dose: '1ª dose aos 12 meses' },
        { name: 'Hepatite A', description: 'Previne hepatite A.', dose: 'Dose única aos 12 meses' },
        { name: 'DTP (tríplice bacteriana)', description: 'Reforço contra difteria, tétano e coqueluche.', dose: '1º reforço aos 15 meses' },
        { name: 'VOP (poliomielite oral)', description: 'Reforço contra poliomielite.', dose: '1º reforço aos 15 meses' },
        { name: 'Tetra viral (SCR + varicela)', description: 'Previne sarampo, caxumba, rubéola e catapora.', dose: '2ª dose aos 15 meses' },
        { name: 'Varicela', description: 'Previne catapora (varicela).', dose: 'Reforço aos 15 meses' },
        { name: 'DTP (tríplice bacteriana)', description: '2º reforço contra difteria, tétano e coqueluche.', dose: '2º reforço aos 4 anos' },
        { name: 'VOP (poliomielite oral)', description: '2º reforço contra poliomielite.', dose: '2º reforço aos 4 anos' },
        { name: 'Febre amarela', description: 'Reforço da prevenção contra febre amarela (se necessário).', dose: 'Reforço aos 4 anos' },
        { name: 'HPV quadrivalente', description: 'Previne infecções pelo papilomavírus humano (HPV) que causam câncer e verrugas genitais.', dose: '2 doses (a partir dos 9 anos, para meninas e meninos)' },
      ]



    },

    {
      title: 'Adolescente',
      age: 'Entre 11 e 19 anos',
      image: 'assets/img/jovem.png',
      content: 'Adolescentes precisam manter em dia vacinas como HPV, meningocócica ACWY, hepatite B e dT. Também é importante atualizar vacinas atrasadas da infância.',
      vaccines: [
        {
          name: 'HPV quadrivalente',
          description: 'Previne infecções causadas pelo Papilomavírus humano (HPV), que podem causar câncer de colo do útero, pênis, ânus e verrugas genitais.',
          dose: '2 doses, com intervalo de 6 meses (para meninos e meninas de 9 a 14 anos)'
        },
        {
          name: 'Meningocócica ACWY (conjugada)',
          description: 'Previne meningite e doenças meningocócicas graves causadas pelos sorogrupos A, C, W e Y.',
          dose: '1 dose aos 11 ou 12 anos (reforço para quem já tomou a C conjugada na infância)'
        },
        {
          name: 'dT (tríplice bacteriana adulto)',
          description: 'Previne difteria e tétano. Substitui o reforço da DTP infantil.',
          dose: 'Reforço a cada 10 anos'
        },
        {
          name: 'Hepatite B',
          description: 'Previne hepatite do tipo B. Caso não tenha completado o esquema vacinal na infância, deve receber 3 doses.',
          dose: '3 doses (0, 1 e 6 meses)'
        },
        {
          name: 'Febre amarela',
          description: 'Previne febre amarela. Caso não tenha sido vacinado antes, deve receber uma dose única.',
          dose: 'Dose única (ou reforço se indicado em áreas de risco)'
        },
        {
          name: 'Tríplice viral (sarampo, caxumba e rubéola - SCR)',
          description: 'Previne sarampo, caxumba e rubéola. Adolescentes sem comprovação vacinal devem receber 2 doses.',
          dose: '2 doses, conforme histórico vacinal'
        },
        {
          name: 'Varicela (catapora)',
          description: 'Previne catapora. Se não vacinado anteriormente, deve receber 2 doses.',
          dose: '2 doses, conforme histórico vacinal'
        },
        {
          name: 'Influenza (gripe)',
          description: 'Previne gripe e complicações respiratórias graves. Indicada anualmente para adolescentes com condições clínicas especiais.',
          dose: '1 dose anual (para grupos prioritários)'
        }
      ]
    },


    {
      title: 'Adulto',
      age: 'Entre 20 e 59 anos',
      image: 'assets/img/adulto.png',
      content: 'Adultos devem manter em dia vacinas como hepatite B, tríplice viral, influenza anual e o reforço da dT a cada 10 anos. A vacinação é essencial para prevenir doenças e manter a imunidade coletiva.',
      vaccines: [
        {
          name: 'Hepatite B',
          description: 'Previne a hepatite tipo B, uma infecção viral que afeta o fígado.',
          dose: '3 doses (esquema 0, 1 e 6 meses, se não tiver comprovação vacinal)'
        },
        {
          name: 'dT (tríplice bacteriana adulto)',
          description: 'Previne difteria e tétano. É o reforço da vacina infantil DTP.',
          dose: 'Reforço a cada 10 anos'
        },
        {
          name: 'Tríplice viral (sarampo, caxumba e rubéola - SCR)',
          description: 'Previne sarampo, caxumba e rubéola. Importante para quem não tomou na infância ou não possui registro vacinal.',
          dose: '2 doses até os 29 anos; 1 dose entre 30 e 59 anos, se não vacinado'
        },
        {
          name: 'Febre amarela',
          description: 'Previne febre amarela, doença grave transmitida por mosquitos. Indicada para quem vive ou viaja para áreas de risco.',
          dose: '1 dose única (ou reforço se indicado em áreas de risco)'
        },
        {
          name: 'Influenza (gripe)',
          description: 'Previne gripe sazonal e suas complicações respiratórias. Recomendável para todos os adultos, especialmente grupos de risco.',
          dose: '1 dose anual'
        },
        {
          name: 'COVID-19',
          description: 'Previne formas graves da COVID-19. Esquema e reforços conforme orientações atualizadas do Ministério da Saúde.',
          dose: 'Doses de acordo com o esquema vigente (bivalente ou atualizada)'
        }
      ]
    },


    {
      title: 'Gestante',
      age: 'Período gestacional',
      image: 'assets/img/gestante.png',
      content: 'Gestantes devem tomar vacinas específicas para proteger tanto a mãe quanto o bebê, garantindo imunidade contra doenças graves. Todas as vacinas devem ser aplicadas em unidades de saúde, conforme orientação médica.',
      vaccines: [
        {
          name: 'dTpa (tríplice bacteriana acelular do tipo adulto)',
          description: 'Protege contra difteria, tétano e coqueluche. A imunização da gestante também protege o bebê nos primeiros meses de vida.',
          dose: '1 dose a cada gestação, preferencialmente entre a 20ª e a 36ª semana'
        },
        {
          name: 'Influenza (gripe)',
          description: 'Previne gripe sazonal e complicações respiratórias graves em gestantes e recém-nascidos.',
          dose: '1 dose anual, em qualquer período da gestação'
        },
        {
          name: 'Hepatite B',
          description: 'Previne hepatite tipo B, que pode ser transmitida da mãe para o bebê durante o parto.',
          dose: '3 doses (0, 1 e 6 meses), se não houver comprovação de vacinação prévia'
        },
        {
          name: 'COVID-19',
          description: 'Previne formas graves da COVID-19. A vacinação é segura e recomendada em qualquer trimestre gestacional.',
          dose: 'Conforme o esquema vigente (doses e reforços atualizados pelo Ministério da Saúde)'
        }
      ]
    },

    {
      title: 'Idoso',
      age: '60+ anos',
      image: 'assets/img/idoso.png',
      content: `Idosos devem manter em dia vacinas que protegem contra doenças respiratórias, infecciosas e complicações graves. A vacinação reduz internações e melhora a qualidade de vida.`,
      vaccines: [
        {
          name: 'Influenza (gripe)',
          description: 'Previne gripe sazonal e complicações respiratórias graves, especialmente em idosos e portadores de doenças crônicas.',
          dose: '1 dose anual (disponível na campanha nacional de vacinação)'
        },
        {
          name: 'Pneumocócica (VPC13/VPC15 + VPP23)',
          description: 'Previne pneumonia, meningite e sepse causadas pelo Streptococcus pneumoniae.',
          dose: '1 dose da vacina conjugada (VPC13 ou VPC15), seguida por 1 dose da polissacarídica (VPP23) de 2 a 12 meses depois.'
        },
        {
          name: 'dT ou dTpa (difteria, tétano e coqueluche)',
          description: 'Previne difteria, tétano e coqueluche. Importante devido ao risco aumentado de infecções e ferimentos em idosos.',
          dose: 'Reforço a cada 10 anos. Se nunca vacinado, completar esquema de 3 doses.'
        },
        {
          name: 'Hepatite B',
          description: 'Previne hepatite tipo B, que pode evoluir para doenças hepáticas crônicas.',
          dose: '3 doses (0, 1 e 6 meses), se não vacinado anteriormente.'
        },
        {
          name: 'COVID-19',
          description: 'Previne formas graves e complicações da COVID-19. Altamente recomendada para idosos e pessoas com comorbidades.',
          dose: 'Conforme o esquema de reforço atualizado pelo Ministério da Saúde (geralmente 1 reforço anual).'
        },
        {
          name: 'Herpes-zóster (cobreiro)',
          description: 'Previne o herpes-zóster e suas complicações, como a neuralgia pós-herpética.',
          dose: '2 doses, com intervalo de 2 a 6 meses entre elas (recomendada para maiores de 60 anos, conforme disponibilidade na rede de saúde).'
        }
      ]
    }
  ];

  selecionarGrupo(group: any) {
    this.selectedGroup = group;
  }

}
