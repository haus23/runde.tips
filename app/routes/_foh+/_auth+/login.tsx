import { Form } from 'react-aria-components';
import { Button, TextField } from '#components/ui';

export const handle = {
  pageTitle: 'Log In',
};

export default function LogInRoute() {
  return (
    <div>
      <h2>Anmeldung</h2>
      <Form>
        <TextField />
        <Button variant="solid" color="accent">
          Code anfordern
        </Button>
      </Form>
    </div>
  );
}
/*
.shadow-medium {
  --tw-shadow: var(--nextui-box-shadow-medium);
  --tw-shadow-colored: var(--nextui-box-shadow-medium);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)
}
*/
