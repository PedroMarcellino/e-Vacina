
import { Vaccines } from "../../../../models/vaccines.model";
import { MatDialogContent } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from "@angular/material/dialog";
import { NgxMaskConfig, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vaccines',
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
  templateUrl: './view-vaccines.component.html',
  styleUrl: './view-vaccines.component.scss'
})
export class ViewVaccinesComponent {

  constructor (
          
    public dialogRef: MatDialogRef<ViewVaccinesComponent>,
    @Inject(MAT_DIALOG_DATA) public vaccine: any,

    ) {}

    close(): void {
    this.dialogRef.close();
    }

}
