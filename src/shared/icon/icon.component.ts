import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-icon',
   standalone: true,
   imports: [
      CommonModule
   ],
   template: `
    <span
      class="material-symbols-rounded"
      [ngClass]="{ 'filled': filled, 'no-fill': !filled }"
      [style.fontSize.px]="size"
      [style.color]="color"
    >
      {{ name }}
    </span>
  `,
   styleUrls: ['./icon.component.scss'],
})
export class AppIconComponent {
   @Input() name!: string;              // Nome do ícone, ex: 'favorite'
   @Input() filled = false;             // true = preenchido, false = contorno
   @Input() size: number = 24;          // Tamanho em px
   @Input() color?: string;             // Cor opcional
}
