// @ts-ignore
let injector = window['injector'];

const getInjector = () =>
  new Promise((resolve) => {
    const check = () => {
      // @ts-ignore
      injector = window['injector'];

      if (injector) {
        resolve(injector);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  });

const inject = (type: any) => getInjector().then(() => injector.get(type));

export { inject };
