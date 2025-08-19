import { MatDialog } from '@angular/material/dialog';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import {
  catchError,
  flatMap,
  map,
  mergeMap,
  tap,
} from 'rxjs/operators';
import { Mutex } from './mutex';
import { inject } from './inject';
import { Injectable } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';

export interface LoadingContext {
  dismiss?: () => void;
  active?: boolean;
  message?: string;
  subscription?: Subscription;
}

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingDialogRef: any = null;
  private loadingElMutex = new Mutex();
  private loadingQueue: LoadingContext[] = [];
  private loadingQueueMutex = new Mutex();

  constructor(private dialog: MatDialog) {}

  private loadingElement(): Promise<any> {
    return this.loadingElMutex.runExclusive(() => {
      if (this.loadingDialogRef != null) {
        return Promise.resolve(this.loadingDialogRef);
      }
      this.loadingDialogRef = this.dialog.open(LoadingSpinnerComponent, {
        disableClose: true,
        panelClass: 'loading-dialog',
      });
      return Promise.resolve(this.loadingDialogRef);
    });
  }

  private enqueueAndPresentFunction(
    message: string | undefined,
    sub: Subscription
  ): Promise<LoadingContext> {
    return this.loadingQueueMutex.runExclusive(async () => {
      const present = this.loadingQueue.length === 0;

      const ctx = {
        message,
        sub,
        active: present,
        dismiss: () => this.nextFunction(ctx),
      };

      this.loadingQueue.push(ctx);
      if (sub) {
        sub.add(() => ctx.dismiss());
      }
      if (present) {
        this.loadingDialogRef.componentInstance.message = message;
        return ctx;
      } else {
        return ctx;
      }
    });
  }

  private freeze(time: number) {
    return new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, time);
    });
  }

  private nextFunction(ctx: LoadingContext) {
    return this.loadingQueueMutex.runExclusive(async () => {
      if (!ctx.active) {
        const i = this.loadingQueue.findIndex((c) => c === ctx);
        this.loadingQueue.splice(i);
        if (this.loadingQueue.length === 0) {
          this.loadingDialogRef.close();
          this.loadingDialogRef = null;
          await this.freeze(100);
          return;
        }
        await this.freeze(100);
        return;
      }

      const current = this.loadingQueue.shift();
      const next = this.loadingQueue[0];
      const dismiss = !next;
      if (current) {
        current.active = false;
      }
      if (dismiss) {
        this.loadingDialogRef.close();
        this.loadingDialogRef = null;
        await this.freeze(100);
        return;
      }
      if (next) {
        this.loadingDialogRef.componentInstance.message = next.message;
        next.active = true;
      }
    });
  }

  public loadingFunction(
    subOrMessage?: string | Subscription,
    message?: string
  ): Promise<LoadingContext> {
    if (typeof subOrMessage === 'string') {
      message = subOrMessage;
      subOrMessage = undefined;
    }

    return this.loadingElement().then(() =>
      this.enqueueAndPresentFunction(message, subOrMessage as Subscription)
    );
  }

  public observe<T>(observable: Observable<T>): Observable<T> {
    const l = this.loadingFunction();

    return from(l).pipe(
      mergeMap((loading) => {
        return of(loading);
      }),
      flatMap((loading) => {
        return observable.pipe(
          map((a) => {
            return a;
          }),
          catchError((err) => {
            console.log(err);
            loading.dismiss?.();
            return throwError(err);
          }),
          tap(() => {
            loading.dismiss?.();
          })
        );
      })
    );
  }
}
