import { VaccinesService } from './../../../services/vaccines/vaccines.service';
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
import { MyVaccinesComponent } from '../my-vaccines.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../services/utils/swal.service';
import { Vaccines } from '../../../../models/vaccines.model';
import { MatDialog } from '@angular/material/dialog';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-form-vaccines',
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
  templateUrl: './form-vaccines.component.html',
  styleUrl: './form-vaccines.component.scss'
})
export class FormVaccinesComponent {
  form!: FormGroup;
  cardTitle: string = 'Cadastro de Vacina'
  formLabels: any[] = [
    {
      label: 'Nome da Vacina',
      fieldtype: 'input',
      type: 'text',
      placeholder: 'Informe o nome da vacina',
      control: 'name',
      colClass: 'col-md-7 col-sm-12'
    },
    {
      label: 'Faixa Etária',
      fieldtype: 'select',
      placeholder: '',
      control: 'age_range',
      options: ['Adulto', 'Bebe','Idoso', 'Jovem'],
      colClass: 'col-md-5 col-sm-12'
    },
    {
      label: 'Status',
      fieldtype: 'select',
      control: 'status',
      options: ['Tomada', 'A Tomar', 'Aguardando Aplicação'],
      colClass: 'col-md-6 col-sm-12'
    },
    {
      label: 'Data da Aplicação',
      fieldtype: 'input',
      type: 'date',
      placeholder: 'Informe a Data',
      control: 'application_date',
      colClass: 'col-md-6 col-sm-12'
    },
  ];

    constructor(
    public dialogRef: MatDialogRef<FormVaccinesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vaccines | null,
    private fb: FormBuilder,
    private vaccinesservice: VaccinesService,
    private swal: SwalService
  ) { }

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

save(): void {
    if (this.form.invalid) {
      this.swal.info('Atenção', 'Preencha os Campos Obrigatórios para Prosseguir');
      return;
    }

    const VaccinesData: Vaccines = {
      ...this.form.getRawValue(),
    };

    if (!this.data) {
      this.vaccinesservice.create(VaccinesData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Vacina cadastrado com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao cadastrar a Vacina.');
        }
      });
    } else {
      this.vaccinesservice.update(VaccinesData.id!, VaccinesData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Vacina atualizada com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao atualizar a vacina.');
        }
      });
    }
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.data) {
      this.cardTitle = 'Edição de Vacina';
      this.form.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      age_range: [null, Validators.required],
      status: [null, Validators.required],
      application_date: [null, Validators.required],
    });
  }


}
