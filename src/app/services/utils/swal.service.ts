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
      confirmButtonColor: '#111F36'
    })
  }

  public info(title: string, message: string) {
    this.spawnAlert('info', title, message);
  }

  public success(title: string, message: string) {
    this.spawnAlert('success', title, message);
  }

  public warning(title: string, message: string) {
    this.spawnAlert('warning', title, message);
  }

  public error(title: string, message: string) {
    this.spawnAlert('error', title, message);
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

  private spawnAlert(icon: SweetAlertIcon, title: string, message: string) {
    this.customSweetAlert.fire(title, message, icon);
  }
}
