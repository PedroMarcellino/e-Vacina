
type MutexReleaser = () => void;
type MutexWorker<T> = () => Promise<T>|T;

export class Mutex {

  private queue: Array<(release: MutexReleaser) => void> = [];
  private pending = false;

  isLocked(): boolean {
    return this.pending;
  }

  acquire(): Promise<MutexReleaser> {
    const ticket = new Promise<MutexReleaser>(resolve => this.queue.push(resolve));

    if (!this.pending) {
      this.dispatchNext();
    }

    return ticket;
  }

  runExclusive<T>(callback: MutexWorker<T>): Promise<T> {
    return this
      .acquire()
      .then(release => {
          let result: T|Promise<T>;

          try {
            result = callback();
          } catch (e) {
            release();
            throw(e);
          }

          return Promise
            .resolve(result)
            .then(
              (x: T) => (release(), x),
              e => {
                release();
                throw e;
              }
            );
        }
      );
  }

  private dispatchNext(): void {
    if (this.queue.length > 0) {
      this.pending = true;
      // tslint:disable-next-line:no-non-null-assertion
      this.queue.shift()?.(this.dispatchNext.bind(this));
    } else {
      this.pending = false;
    }
  }
}
