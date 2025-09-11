import { Leads } from "../../../../models/leads.model";
import { MatDialogContent } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions } from "@angular/material/dialog";
import { NgxMaskConfig, NgxMaskPipe, provideNgxMask} from "ngx-mask";

@Component({
  selector: 'app-view-leads',
  standalone: true,
  imports: [
      MatDialogContent, 
      MatDialogActions, 
      NgxMaskPipe
  ],
  templateUrl: './view-leads.component.html',
  styleUrl: './view-leads.component.scss'
})
export class ViewLeadsComponent {
    
     constructor (
          
    public dialogRef: MatDialogRef<ViewLeadsComponent>,
    @Inject(MAT_DIALOG_DATA) public lead: any,

    ) {}

    close(): void {
    this.dialogRef.close();
    }
}
