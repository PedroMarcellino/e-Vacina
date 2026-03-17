import { Families } from "../../../../models/families.model";
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
  selector: 'app-view-family',
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
  templateUrl: './view-family.component.html',
  styleUrl: './view-family.component.scss'
})
export class ViewFamilyComponent {
     
    constructor (
          
    public dialogRef: MatDialogRef<ViewFamilyComponent>,
    @Inject(MAT_DIALOG_DATA) public family: any,

    ) {}

    close(): void {
    this.dialogRef.close();
    }
}
