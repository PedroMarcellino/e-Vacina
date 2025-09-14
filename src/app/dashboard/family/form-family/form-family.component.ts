import { FamiliesService } from './../../../services/families/families.service';
import { Component } from '@angular/core';
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
import { FamilyComponent } from '../family.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../services/utils/swal.service';
import { Vaccines } from '../../../../models/vaccines.model';
import { MatDialog } from '@angular/material/dialog';
import { text } from 'stream/consumers';
import { MatDialogRef } from '@angular/material/dialog';
import { Families } from '../../../../models/families.model';


@Component({
  selector: 'app-form-family',
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
  templateUrl: './form-family.component.html',
  styleUrl: './form-family.component.scss'
})
export class FormFamilyComponent {
  form!: FormGroup;
  cardTitle: string = 'Cadastro de Familiar'
  formLabels: any[] = [
    {
      label: 'Nome',
      fieldtype: 'input',
      type: 'text',
      placeholder: 'Informe o nome do familiar',
      control: 'relative_name',
      colClass: 'col-md-7 col-sm-12'
    },
    {
      label: 'idade',
      fieldtype: 'input',
      type: 'text',
      control: 'age',
      placeholder: 'Informe a idade',
      colClass: 'col-md-5 col-sm-12'
    },
    {
      label: 'Nome da vacina',
      fieldtype: 'input',
      type: 'text',
      placeholder: 'Informe o nome da vacina',
      control: 'name_vaccine',
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
      public dialogRef: MatDialogRef<FormFamilyComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Families | null,
      private fb: FormBuilder,
      private familiesService: FamiliesService,
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

    const FamilyData: Vaccines = {
      ...this.form.getRawValue(),
    };

    if (!this.data) {
      this.familiesService.create(FamilyData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Familiar cadastrado com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao cadastrar o familiar.');
        }
      });
    } else {
      this.familiesService.update(FamilyData.id!, FamilyData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Familiar atualizado com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao atualizar o familiar.');
        }
      });
    }
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.data) {
      this.cardTitle = 'Edição do familiar';
      this.form.patchValue(this.data);
    }
  }

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
     // name: [null, Validators.required],
      relative_name: [null, Validators.required],
      name_vaccine: [null, Validators.required],
      age: [null, Validators.required],
      application_date: [null, Validators.required],
    });
  }
}
