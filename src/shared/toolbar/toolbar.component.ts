import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    CommonModule,],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  previewUrl: string | ArrayBuffer | null = null;
  hidden = true;
  @Input() drawer: any;
  @Output() hasChanged: EventEmitter<any> = new EventEmitter();
  user = this.authService.getUser();
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  toggleBadgeVisibilty() {
    this.hidden = !this.hidden;
  }

  drawerChange(event: any) {
    this.hasChanged.emit(event);
  }

}
