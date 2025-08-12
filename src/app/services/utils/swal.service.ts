import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  private spawnAlert(icon: SweetAlertIcon, title: string, message: string) {
    Swal.fire({
      icon,
      title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  public success(titleOrMessage: string, message?: string) {
    if (!message) {
      this.spawnAlert('success', 'Sucesso', titleOrMessage);
    } else {
      this.spawnAlert('success', titleOrMessage, message);
    }
  }

  public error(titleOrMessage: string, message?: string) {
    if (!message) {
      this.spawnAlert('error', 'Erro', titleOrMessage);
    } else {
      this.spawnAlert('error', titleOrMessage, message);
    }
  }

  public warning(titleOrMessage: string, message?: string) {
    if (!message) {
      this.spawnAlert('warning', 'Atenção', titleOrMessage);
    } else {
      this.spawnAlert('warning', titleOrMessage, message);
    }
  }

  public info(titleOrMessage: string, message?: string) {
    if (!message) {
      this.spawnAlert('info', 'Informação', titleOrMessage);
    } else {
      this.spawnAlert('info', titleOrMessage, message);
    }
  }
}
