import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

type SwalProps = {
  title: string
  message: string
};

type CallbackPopup = {
  title: string
  message: string
  onApprove: () => SwalProps | Promise<void>
  onDecline?: () => SwalProps | Promise<void>
}

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  customSweetAlert;

  constructor() {
    this.customSweetAlert = Swal.mixin({
      confirmButtonColor: '#0047AB'
    })
  }

  private spawnAlert(icon: SweetAlertIcon, title: string, message: string) {
    return Swal.fire({
      icon,
      title,
      text: message,
      confirmButtonText: 'OK'
    });
  }

  public success(titleOrMessage: string, message?: string) {
    if (!message) {
      return this.spawnAlert('success', 'Sucesso', titleOrMessage);
    } else {
      return this.spawnAlert('success', titleOrMessage, message);
    }
  }

  public error(titleOrMessage: string, message?: string) {
    if (!message) {
      return this.spawnAlert('error', 'Erro', titleOrMessage);
    } else {
      return this.spawnAlert('error', titleOrMessage, message);
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

  public loading(message: string = 'Carregando...') {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  public close() {
    Swal.close();
  }

  public popup({ title, message: text, onApprove, onDecline }: CallbackPopup) {
    this.customSweetAlert.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        let props = onApprove();
        if (!(props instanceof Promise)) {
          if (props) {
            this.success(props.title, props.message);
          } else {
            this.success('Deletado!', 'A operação foi concluída!');
          }
        }
      } else {
        if (onDecline) {
          let props = onDecline();
          if (!(props instanceof Promise)) {
            if (props) {
              this.info(props.title, props.message);
              return;
            }
          }
        }
        this.info('Cancelado com sucesso!', 'Você cancelou esta operação');
      }
    });
  }
}
