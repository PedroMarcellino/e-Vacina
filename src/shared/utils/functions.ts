export function objectToFormData(
  obj: any,
  formData?: FormData,
  namespace?: string
): FormData {
  const fd = formData || new FormData();
  let formKey;

  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (namespace) {
        formKey = `${namespace}[${property}]`;
      } else {
        formKey = property;
      }

      const value = obj[property];

      const finalValue = value === '' ? null : value;

      if (typeof finalValue === 'object' && !(finalValue instanceof File)) {
        objectToFormData(finalValue, fd, formKey);
      } else {
        fd.append(formKey, finalValue);
      }
    }
  }

  return fd;
}

export function removerTagsHTML(texto: string) {
  return texto.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '');
}
