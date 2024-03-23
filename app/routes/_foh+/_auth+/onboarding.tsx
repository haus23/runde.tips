import { Form } from 'react-aria-components';
import { Card, CardBody, CardHeader } from '#components/card';
import { Button, Divider, TextField } from '#components/ui';

export const handle = {
  pageTitle: 'Boarding',
};

export default function OnboardingRoute() {
  return (
    <Card className="sm:mt-8">
      <CardHeader asChild>
        <h2>Code Eingabe</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <Form className="flex flex-col gap-y-4">
          <TextField
            type="text"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            aria-label="Code"
            isRequired
            pattern="\d{6}"
            maxLength={6}
            className="text-center"
            inputClassName="w-40 self-center text-4xl text-center"
            errorMessage={({ validationErrors, validationDetails }) =>
              validationDetails.valueMissing
                ? 'Ohne Code geht es nicht weiter.'
                : validationDetails.patternMismatch
                  ? 'Kein Code. Ein Code hat genau sechs Ziffern.'
                  : validationDetails.customError
                    ? validationErrors.join()
                    : ''
            }
          />
          <Button
            variant="solid"
            color="accent"
            className="self-center"
            type="submit"
          >
            Prüfen
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
}
