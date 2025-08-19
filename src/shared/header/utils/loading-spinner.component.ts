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
  width: 64px;
  height: 48px;
  position: relative;
  animation: split 1s ease-in infinite alternate;
}
.loader::before , .loader::after {
  content: '';
  position: absolute;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  left: 0;
  top: 0;
  transform: translateX(-10px);
  background: #FF3D00;
  opacity: 0.75;
  backdrop-filter: blur(20px);
}

.loader::after {
  left: auto;
  right: 0;
  background: #193a85;
  transform: translateX(10px);
}

@keyframes split {
 0% , 25%{ width: 64px }
 100%{ width: 148px }
}
  
    `,
  ],
})
export class LoadingSpinnerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
