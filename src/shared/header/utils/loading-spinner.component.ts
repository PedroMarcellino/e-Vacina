// loading-spinner.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <!-- <div class="loading-container">
      <mat-spinner></mat-spinner>
      <p>{{ data.message }}</p>
    </div> -->
    <div class="loader"></div>
  `,
  styles: [
    `
      // .loading-container {
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      //   justify-content: center;
      //   padding: 24px;

      // }
      // mat-spinner {
      //   margin-bottom: 16px;
      // }

    .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
    border-bottom-color: #0048ffff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
    `,
  ],
})
export class LoadingSpinnerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
