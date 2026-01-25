import { VaccinesService } from './../../services/vaccines/vaccines.service';
import { Component, EventEmitter, Input, Output, ViewChild, OnInit } from '@angular/core';
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
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FormVaccinesComponent } from './form-vaccines/form-vaccines.component';
import { ViewVaccinesComponent } from './view-vaccines/view-vaccines.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
interface VaccinesData {
  id: number;
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
    MatTabsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './my-vaccines.component.html',
  styleUrls: ['./my-vaccines.component.scss']
})
export class MyVaccinesComponent implements OnInit {
  vaccines: VaccinesData[] = [];
  length = 0;
  pageIndex = 0;
  pageSize = 10;
  viewMode: 'cards' | 'table' = 'cards';
  vacinasAplicadas: VaccinesData[] = [];
  vacinasATomar: VaccinesData[] = [];
  vacinasAguardando: VaccinesData[] = [];
  filteredVaccines: any[] = [];
  user = this.authService.getUser();
  previewUrl: string | ArrayBuffer | null = null;
  routeData!: { title: string; subtitle: string; showButtons: boolean };
  dataSource!: MatTableDataSource<VaccinesData>;

  displayedColumns: string[] = [
    'name',
    'age_range',
    'status',
    'application_date',
    'actions'

  ];

  selectedTabIndex = 0;


  @Input() items: any[] = [];
  @Input() status: string = '';
  @Output() refreshTasks = new EventEmitter<void>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private authService: AuthService,
    private vaccinesservice: VaccinesService,
    private swalService: SwalService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAllVaccines();
  }

  listItems() {
    return this.items.filter(item => item.status === this.status);
  }


  onStatusChange(vaccine: VaccinesData): void {
    this.vaccinesservice.updateStatus(vaccine.id, vaccine.status).subscribe({
      next: () => {
        this.swalService.success('Status atualizado', 'O status da vacina foi atualizado com sucesso.');
        this.findAllVaccines();
      },
      error: () => {
        this.swalService.error('Erro', 'Não foi possível atualizar o status da vacina.');
      }
    });
  }

  downloadVaccinesPdf() {
    this.vaccinesservice.generateVaccinesPdf().subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio_e-vacina.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => {
        this.swalService.error('Erro', 'Não foi possível gerar o PDF.');
      }
    });
  }

  findAllVaccines() {
    this.vaccinesservice.findAll({
      page: this.pageIndex + 1,
      per_page: this.pageSize,
      ...HttpParams
    }).subscribe({
      next: (response: any) => {
        const vaccinesResponse = Array.isArray(response) ? response : response.data;
        const paginated = response.data;
        this.length = paginated.total;
        this.pageIndex = paginated.current_page - 1;

        if (Array.isArray(vaccinesResponse)) {
          this.vaccines = vaccinesResponse;
          this.dataSource = new MatTableDataSource(this.vaccines);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

          const statusMap = ['A Tomar', 'Aguardando Aplicação', 'Aplicada'];
          const initialStatus = statusMap[this.selectedTabIndex] || 'A Tomar';
          this.filteredVaccines = this.vaccines.filter(v => v.status === initialStatus);
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

  openViewDialog(vaccine?: VaccinesData) {
    const dialogRef = this.dialog.open(ViewVaccinesComponent, {
      width: '700px',
      height: '490px',
      panelClass: 'mat-dialog-content',
      data: vaccine,
      autoFocus: false,
      disableClose: true
    });
  }

  editUser(vaccine: any) {
    this.router.navigate([`/form-vaccines/${vaccine.id}`]);
  }

  forceDeleteUser(vacine: any) {
    this.swalService.popup({
      title: 'Excluir Vacina',
      message: `Deseja excluir permanentemente ${vacine.name}? Essa ação não poderá ser desfeita.`,
      onApprove: async (): Promise<void> => {
        try {
          await this.vaccinesservice.forceDelete(vacine.id).toPromise();
          this.swalService.success('Excluído', 'Vacina excluída com sucesso.');
          this.findAllVaccines();
        } catch (error) {
          this.swalService.error('Erro', 'Erro ao excluir a vacina.');
        }
      }
    });
  }

  filterByTab(event: any): void {
    const tabIndex = event.index;
    const statusMap = ['A Tomar', 'Aguardando Aplicação', 'Aplicada'];
    this.filteredVaccines = this.vaccines.filter(v => v.status === statusMap[tabIndex]);
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.findAllVaccines();
  }
}
