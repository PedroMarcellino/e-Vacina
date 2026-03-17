import { Component } from '@angular/core';
import { AfterViewInit,  } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  isOffcanvasOpen = false;
  ngAfterViewInit(): void {}

  onOffcanvasShown() {
    this.isOffcanvasOpen = true;
  }

  onOffcanvasHidden() {
    this.isOffcanvasOpen = false;
  }

}
