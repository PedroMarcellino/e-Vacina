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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { SwalService } from '../../../services/utils/swal.service';
import { Vaccines } from '../../../../models/vaccines.model';
import { MatDialog } from '@angular/material/dialog';
import { text } from 'stream/consumers';
import { MatDialogRef } from '@angular/material/dialog';
import { MyProfileComponent } from '../my-profile.component';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../../../services/users/users.service';
import { Users } from '../../../../models/Users.model';

@Component({
  selector: 'app-form-my-profile',
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
    NgxMaskDirective],
  templateUrl: './form-my-profile.component.html',
  styleUrl: './form-my-profile.component.scss'
})
export class FormMyProfileComponent {
  form!: FormGroup;
  cardTitle: string = 'Cadastro de Usuario'
  formLabels: any[] = [
    {
      label: 'Nome',
      fieldtype: 'input',
      type: 'text',
      placeholder: 'Informe o nome',
      control: 'name',
      colClass: 'col-md-6 col-sm-12'
    },
    {
      label: 'E-mail',
      fieldtype: 'input',
      type: 'text',
      placeholder: 'Informe o email',
      control: 'email',
      colClass: 'col-md-6 col-sm-12'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<FormMyProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Users | null,
    private fb: FormBuilder,
    private usersService: UsersService,
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

  initializeForm(): void {
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, Validators.email],
    });
  }

  ngOnInit(): void {
    this.initializeForm();

    if (this.data) {
      this.cardTitle = 'Edição de Usuário';
      this.form.patchValue(this.data);
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.swal.info('Atenção', 'Preencha os Campos Obrigatórios para Prosseguir');
      return;
    }

    const UsersData: Users = {
      ...this.form.getRawValue(),
    };

    if (!this.data) {
      this.usersService.create(UsersData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Usuário cadastrado com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao cadastrar o Usuário.');
        }
      });
    } else {
      this.usersService.update(UsersData.id!, UsersData).subscribe({
        next: res => {
          this.swal.success('Sucesso!', 'Usuário atualizado com sucesso.');
          this.dialogRef.close(res);
        },
        error: () => {
          this.swal.error('Erro!', 'Erro ao atualizar o Usuário.');
        }
      });
    }
  }
}
