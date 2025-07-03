import { createFormHook } from '@tanstack/react-form';
import { OtpField } from '~/components/ui/form/otp-field';
import { SubscribeButton } from '~/components/ui/form/subscribe-button';
import { TextField } from '~/components/ui/form/text-field';
import { fieldContext, formContext } from '~/hooks/form-context';

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    OtpField,
  },
  formComponents: {
    Button: SubscribeButton,
  },
});
