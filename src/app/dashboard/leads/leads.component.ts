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
import { LeadsService } from '../../services/leads/leads.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormLeadsComponent } from './form-leads/form-leads.component';

interface LeadsData {
  full_name: string;
  email: string;
  phone?: string | null;
  message: string;
  actions: string,
  deleted_at?: Date | null;
}

@Component({
  selector: 'app-leads',
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
    NgxMaskPipe
  ],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
     routeData!: { title: string; subtitle: string; showButtons: boolean };
     dataSource!: MatTableDataSource<LeadsData>;
      displayedColumns: string[] = [
        'full_name',
        'email',
        'phone',
        'message',
        'actions'
      ];

      @ViewChild(MatPaginator) paginator!: MatPaginator;
      @ViewChild(MatSort) sort!: MatSort;

      constructor(
    private dialog: MatDialog,
    private leadsService: LeadsService,
    private swalService: SwalService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.loadUsers();
  }

  openDialog(leads?: LeadsData): void {
    const dialogRef = this.dialog.open(FormLeadsComponent, {
      data: leads,
      width: '600px',
      panelClass: 'custom-modal',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  loadUsers(): void {
    this.leadsService.findAll().subscribe({
      next: (response: any) => {
        // this.leads = response;
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.error('Erro ao buscar leads:', error);
        this.swalService.error(
          'Erro ao carregar os Leads',
          'Não foi possível carregar os Leads da API.'
        );
      }
    });
  }

  editUser(leads: any) {
    this.router.navigate([`/form-leads/${leads.id}`]);
  }

  forceDeleteUser(leads: any) {
    this.swalService.popup({
      title: 'Excluir Lead',
      message: `Deseja excluir permanentemente ${leads.full_name}? Essa ação não poderá ser desfeita.`,
      onApprove: async (): Promise<void> => {
        try {
          await this.leadsService.forceDelete(leads.id).toPromise();
          this.swalService.success('Excluído', 'Lead excluído com sucesso.');
          this.loadUsers();
        } catch (error) {
          this.swalService.error('Erro', 'Erro ao excluir o lead.');
        }
      }
    });
  }
}
