import { useFormContext } from '~/hooks/form-context';
import type { ButtonProps } from '../button';
import { Button } from '../button';

export function SubscribeButton({ isDisabled, ...props }: ButtonProps) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          {...props}
          type="submit"
          isDisabled={isDisabled || isSubmitting}
        />
      )}
    </form.Subscribe>
  );
}
