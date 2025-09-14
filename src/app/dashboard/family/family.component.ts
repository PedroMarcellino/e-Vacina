import { ViewFamilyComponent } from './view-family/view-family.component';
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
import { FormFamilyComponent } from './form-family/form-family.component';
import { FamiliesService } from '../../services/families/families.service';

interface FamilyData {
 // name: string;
  relative_name: string;
  age: string;
  name_vaccine: string;
  application_date: string;
  actions: string,
  deleted_at?: Date | null;
}


@Component({
  selector: 'app-family',
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
  templateUrl: './family.component.html',
  styleUrl: './family.component.scss'
})
export class FamilyComponent {
   routeData!: { title: string; subtitle: string; showButtons: boolean };
       dataSource!: MatTableDataSource<FamilyData>;
        displayedColumns: string[] = [
          'relative_name',
          'age',
          'name_vaccine',
          'application_date',
          'actions'
        ];
  
        @ViewChild(MatPaginator) paginator!: MatPaginator;
        @ViewChild(MatSort) sort!: MatSort;
  
        constructor(
      private dialog: MatDialog,
      private familiesService: FamiliesService,
      private swalService: SwalService,
      private router: Router
    ) { }
  
  
    ngOnInit(): void {
      this.loadFamily();
    }
  
    openDialog(family?: FamilyData): void {
      const dialogRef = this.dialog.open(FormFamilyComponent, {
        data: family,
        width: '600px',
        panelClass: 'custom-modal',
        autoFocus: false,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadFamily();
        }
      });
    }
  
    openViewDialog(family?: FamilyData) {
      const dialogRef = this.dialog.open(ViewFamilyComponent, {
      width: '700px',
      height: '490px',
      panelClass: 'mat-dialog-content',
      data: family, 
      autoFocus: false,
      disableClose: true
    });
  }
  
    loadFamily(): void {
      this.familiesService.findAll().subscribe({
        next: (response: any) => {
          // this.leads = response;
          this.dataSource = new MatTableDataSource(response.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (error) => {
          console.error('Erro ao buscar os Familiares:', error);
          this.swalService.error(
            'Erro ao carregar os Familiares',
            'Não foi possível carregar os familiares do cadastros.'
          );
        }
      });
    }
  
    editUser(family: any) {
      this.router.navigate([`/form-family/${family.id}`]);
    }
  
    forceDeleteUser(family: any) {
      this.swalService.popup({
        title: 'Excluir Familiar',
        message: `Deseja excluir permanentemente ${family.relative_name}? Essa ação não poderá ser desfeita.`,
        onApprove: async (): Promise<void> => {
          try {
            await this.familiesService.forceDelete(family.id).toPromise();
            this.swalService.success('Excluído', 'Familiar excluído com sucesso.');
            this.loadFamily();
          } catch (error) {
            this.swalService.error('Erro', 'Erro ao excluir o familiar.');
          }
        }
      });
    }

}
