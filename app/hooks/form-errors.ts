import type { AnyFormApi } from '@tanstack/react-form';

import { useStore } from '@tanstack/react-form';
import { useMemo } from 'react';

export function useFormErrors<TForm extends AnyFormApi>(
  form: TForm,
  mergedErrors?: Record<string, string>,
) {
  const fieldMeta = useStore(form.store, (state) => state.fieldMeta);
  return useMemo(() => {
    const formErrors = Object.entries(fieldMeta).reduce(
      (acc, [key, value]) => {
        if (value.errors.length > 0) {
          acc[key] = value.errors;
        }
        return acc;
      },
      {} as Record<string, string[]>,
    );
    return mergedErrors
      ? Object.entries(mergedErrors).reduce((acc, [key, error]) => {
          if (acc[key]) {
            acc[key].push(error);
          } else {
            acc[key] = [error];
          }
          return acc;
        }, formErrors)
      : formErrors;
  }, [fieldMeta, mergedErrors]);
}
