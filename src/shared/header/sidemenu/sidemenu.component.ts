import { AuthService } from './../../../app/auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { SwalService } from '../../../app/services/utils/swal.service';


@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [
    MatMenuModule,
    CommonModule,
    RouterModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  user: any = null;
  isAdmin: boolean = false;
  isOrganizer: boolean = false;


   menus = [
    {
      title: 'Sistema E-Vacina',
      contentMenus: [
        {
          label: 'Dashboard',
          icon: 'bi bi-graph-up	',
          route: '/dashboard',
        },
        {
          label: 'Minhas Vacinas',
          icon: 'bi bi-person-fill-gear',
          route: '/my-vaccines',
        },
        {
          label: 'Sobre as Vacinas',
          icon: 'bi bi-heart-pulse-fill',
          route: '/about-vaccines',
        },
        {
          label: 'Familiares',
          icon: 'bi bi-people-fill',
          route: '/family',
        },
        {
          label: 'Agendamentos',
          icon: 'bi bi-clipboard-plus-fill',
          route: '/agenda',
        },
        {
          label: 'Caixa de Mensagem',
          icon: 'bi bi-envelope-at-fill',
          route: '/leads',
        },
        {
          label: 'Configurações e Perfil',
          icon: 'bi bi-gear-fill',
          route: '/my-profile',
        },
        {
          label: 'Sair',
          icon: 'bi bi-box-arrow-right',
          // route: '/',
          handler: () => {
            this.confirmLogout();
          },
        },

      ],
    },
  ];

  constructor(private AuthService: AuthService, private router: Router) {
    this.user = this.AuthService.getToken();
    this.isAdmin = this.user?.is_admin;
    this.isOrganizer = this.user?.is_organizer;
  }



  ngOnInit(): void { }

  logout() {
    this.AuthService.logout();
    sessionStorage.clear();
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  confirmLogout() {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#107C41',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SIM, SAIR!',
      cancelButtonText: 'CANCELAR',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }



}
