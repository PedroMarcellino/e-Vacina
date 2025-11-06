import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users/users.service';
import { SwalService } from '../../services/utils/swal.service';
import { FormMyProfileComponent } from './form-my-profile/form-my-profile.component';
import { Users } from '../../../models/Users.model';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { LoadingSpinnerComponent } from '../../../shared/header/utils/loading-spinner.component';
import { LoadingService } from '../../../shared/header/utils/loading';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [
    CommonModule,

  ],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  previewUrl: string | null = null;
  selectedFile: File | null = null;
  user: Users | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private swalService: SwalService,
    private dialog: MatDialog,
    private usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }


  getAll(): void {
    const storedUser = this.authService.getUser();
    const userId = storedUser?.id;

    if (!userId) {
      this.swalService.error('Erro!', 'Usuário não encontrado. Faça login novamente.');
      this.authService.logout();
      return;
    }

    const loadingDialog = this.dialog.open(LoadingSpinnerComponent, {
      disableClose: true,
      panelClass: 'transparent-dialog',
    });

    this.usersService.getById(userId).subscribe({
      next: (res: Users) => {
        if (res) {
          this.user = res;
          this.authService.setUser(res);
        } else {
          this.swalService.warning('Aviso!', 'Nenhum dado de usuário encontrado.');
        }
        loadingDialog.close();
      },
      error: (err) => {
        console.error('Erro ao buscar usuário:', err);
        loadingDialog.close();
        this.swalService.error('Erro!', 'Não foi possível carregar os dados do usuário. Tente novamente mais tarde.');
      },
      complete: () => {
        if (loadingDialog) loadingDialog.close();
      }
    });
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadPhoto(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('photo', this.selectedFile);

    this.http.post<{ photo_url: string, user: any }>(
      'http://localhost:8000/api/users/upload-photo',
      formData
    ).subscribe({
      next: (res) => {
        console.log('Upload feito com sucesso', res);

        this.previewUrl = res.photo_url;
        this.authService.setUser(res.user);
        this.user = res.user;

        this.swalService.success('Sucesso!', 'Foto enviada com sucesso!')
          .then(() => {
            window.location.reload();
          });
      },
      error: (err) => {
        console.error('Erro no upload', err);
        this.swalService.error('Erro!', 'Não foi possível enviar a foto.');
      }
    });
  }

  openDialog(user?: Users | null): void {
    if (!user) return;
    const dialogRef = this.dialog.open(FormMyProfileComponent, {
      data: user,
      width: '650px',
      panelClass: 'mat-dialog-content',
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getAll();
    });
  }



}
