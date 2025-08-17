
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../../app/auth/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {

   menuItems: MenuItem[] = [
    { label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    { label: 'Minhas Vacinas',
      icon: 'vaccines',
      route:'/my-accines'
    },
    { label: 'Sobre as Vacinas',
      icon: 'vaccines',
      route: '/configuracoes'
    },
    { label: 'Perfil e Configurações',
      icon: 'settings',
      route: '/configuracoes'
    },
  ];

  user: any = null;
  isAdmin: boolean = false;
  isOrganizer: boolean = false;

  ngOnInit(): void { }



}
