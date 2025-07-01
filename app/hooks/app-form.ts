import { createFormHook } from '@tanstack/react-form';
import { TextField } from '~/components/ui/form/text-field';
import { fieldContext, formContext } from '~/hooks/form-context';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
});
