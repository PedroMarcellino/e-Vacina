import { LeadsService } from '../../../services/leads/leads.service';
import { LeadsComponent } from '../leads.component';
import { Leads } from '../../../../models/leads.model';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../services/utils/swal.service';
import { Vaccines } from '../../../../models/vaccines.model';
import { MatDialog } from '@angular/material/dialog';
import { text } from 'stream/consumers';


@Component({
  selector: 'app-form-leads',
  standalone: true,
  imports: [

    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskPipe,
    MatInputModule,
    MatDialogModule,
    NgSelectModule,
    NgxMaskDirective
],

  templateUrl: './form-leads.component.html',
  styleUrl: './form-leads.component.scss'
})
export class FormLeadsComponent {
    form!: FormGroup;

    cardTitle: string = 'Cadastro de Lead'

    formLabels: any[] = [
      {
        label: 'Nome',
        fieldtype: 'input',
        type: 'text',
        placeholder: 'Informe o nome',
        control: 'full_name',
        colClass: 'col-md-6 col-sm-12'
      },
      {
        label: 'E-mail',
        fieldtype: 'input',
        type: 'text',
        placeholder: 'Informe o e-mail',
        control: 'email',
        colClass: 'col-md-6 col-sm-12'
      },
      {
        label: 'Telefone',
        fieldtype: 'input',
        type: 'text',
        placeholder: 'Informe o telefone',
        control: 'phone',
        colClass: 'col-md-6 col-sm-12'
      },
      {
        label: 'Mensagem',
        fieldtype: 'input',
        type: 'text',
        placeholder: 'Informe a mensagem',
        control: 'message',
        colClass: 'col-md-6 col-sm-12'
      }
    ];

     constructor(
           public dialogRef: MatDialogRef<FormLeadsComponent>,
          @Inject(MAT_DIALOG_DATA) public data: Leads | null,
          private formBuilder: FormBuilder,
          private LeadsService: LeadsService,
          private swalService: SwalService,
        ) { }

    ngOnInit(): void {
      this.initializeForm();
  
      if (this.data) {
        this.cardTitle = 'Edição de Lead';
        this.form.patchValue(this.data);
      }
    }

    initializeForm(): void {
      this.form = this.formBuilder.group({
        id: [null],
        full_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        message: ['', Validators.required]
      });
    }

    save(): void {
          if (this.form.invalid) {
            this.swalService.info('Atenção', 'Preencha os Campos Obrigatórios para Prosseguir');
            return;
          }
      
          const leadsData: Leads = {
            ...this.form.getRawValue(),
          };
      
          if (!this.data) {
            this.LeadsService.create(leadsData).subscribe({
              next: res => {
                this.swalService.success('Sucesso!', 'Lead cadastrado com sucesso.');
                this.dialogRef.close(res);
              },
              error: () => {
                this.swalService.error('Erro!', 'Erro ao cadastrar o lead.');
              }
            });
          } else {
            this.LeadsService.update(leadsData.id!, leadsData).subscribe({
              next: res => {
                this.swalService.success('Sucesso!', 'Lead atualizado com sucesso.');
                this.dialogRef.close(res);
              },
              error: () => {
                this.swalService.error('Erro!', 'Erro ao atualizar o lead.');
              }
            });
          }
        }

  handleEnter(event: KeyboardEvent) {
  event.preventDefault();

  const target = event.target as HTMLElement;
  const form = target.closest('form');
  if (!form) return;

  const focusable = Array.from(
    form.querySelectorAll<HTMLElement>('input, select, textarea, ng-select, button')
  ).filter(el => !el.hasAttribute('disabled'));

  const index = focusable.indexOf(target);

  if (index > -1 && index < focusable.length - 1) {
    focusable[index + 1].focus();
  } else {
    const submit = form.querySelector<HTMLElement>('button[color=primary]');
    submit?.focus();
  }
}

}
