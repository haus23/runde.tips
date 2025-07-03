import type { AnyFormApi } from '@tanstack/react-form';

import { useStore } from '@tanstack/react-form';

export function useFormErrors<TForm extends AnyFormApi>(
  form: TForm,
  serverErrors?: Record<string, string>,
) {
  const fieldMeta = useStore(form.store, (state) => state.fieldMeta);

  const formErrors = Object.entries(fieldMeta).reduce(
    (acc, [key, value]) => {
      if (value.errors.length > 0) {
        acc[key] = value.errors;
      }
      return acc;
    },
    {} as Record<string, string[]>,
  );

  // Return formErros if any. Otherwise the untouched server errors.
  return Object.keys(formErrors).length > 0 ? formErrors : serverErrors;
}
