import { VaccinesService } from './../../services/vaccines/vaccines.service';
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
import { Vaccines } from '../../../models/vaccines.model';
import { FormVaccinesComponent } from './form-vaccines/form-vaccines.component';

interface VaccinesData {
  name: string;
  age_range: string;
  status: string;
  application_date: string;
  actions: string;
  deleted_at?: Date | null;
}

@Component({
  selector: 'app-my-vaccines',
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
  ],
  templateUrl: './my-vaccines.component.html',
  styleUrls: ['./my-vaccines.component.scss']
})
export class MyVaccinesComponent implements OnInit {
  vaccines: VaccinesData[] = []; 
  routeData!: { title: string; subtitle: string; showButtons: boolean };
  dataSource!: MatTableDataSource<VaccinesData>;

  displayedColumns: string[] = [
    'name',
    'age_range',
    'status',
    'application_date',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private vaccinesservice: VaccinesService,
    private swalService: SwalService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.findAllVaccines();
  }

  findAllVaccines() {
    this.vaccinesservice.findAll().subscribe({
      next: (response: any) => {
        const vaccinesResponse = response.data;

        if (Array.isArray(vaccinesResponse)) {
          this.vaccines = vaccinesResponse;
          this.dataSource = new MatTableDataSource(this.vaccines); 
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          console.error('A resposta da API não é um array:', vaccinesResponse);
        }
      },
      error: (error) => {
        console.error(error);
        this.swalService.error(
          'Erro ao carregar as vacinas',
          'Não foi possível carregar as vacinas da API.'
        );
      }
    });
  }

   openDialog(vaccine?: Vaccines) {
        const dialogRef = this.dialog.open(FormVaccinesComponent, {
          data: vaccine,
          width: '650px',   
          panelClass: 'mat-dialog-content', 
          autoFocus: false,
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.findAllVaccines();
          }
        });
      }
}
