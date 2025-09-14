import { Component, Inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { Vaccines } from '../../models/vaccines.model';
import { MatDialogContent } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from "@angular/material/dialog";
import { NgxMaskConfig, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard/dashboard.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ 
      MatDialogContent, 
      MatDialogActions, 
      NgxMaskPipe,
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
    
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    
    constructor (
       
    ) {}
}
