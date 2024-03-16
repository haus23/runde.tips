import { Form } from 'react-aria-components';
import { Card, CardBody, CardHeader } from '#components/card';
import { Button, Divider, TextField } from '#components/ui';

export const handle = {
  pageTitle: 'Log In',
};

export default function LogInRoute() {
  return (
    <Card className="sm:mt-8">
      <CardHeader asChild>
        <h2>Anmeldung</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form className="flex flex-col gap-y-4">
          <TextField
            isRequired
            type="email"
            label="E-Mail"
            description="Deine für die Tipprunde genutzte E-Mail Adresse."
            errorMessage={({ validationDetails, validationErrors }) =>
              validationDetails.valueMissing
                ? 'Ohne Email-Adresse geht es nicht.'
                : validationDetails.typeMismatch
                  ? 'Ungültige Email-Adresse.'
                  : validationDetails.customError
                    ? validationErrors.join()
                    : ''
            }
          />
          <Button
            variant="solid"
            color="accent"
            className="self-start"
            type="submit"
          >
            Code anfordern
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
