import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import { Form } from 'react-aria-components';
import { z } from 'zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FieldError,
  Input,
  Label,
  TextField,
} from '#components/ui';
export const handle = { pageTitle: 'Ligen / Runden' };

const schema = z.object({
  name: z.string({ message: 'Notwendig. Zum Beispiel: "Oberliga Nord"' }),
  shortname: z.string({ message: 'Notwendig. Zum Beispiel: "OL NO"' }),
  slug: z
    .string({ message: 'Notwendig. Zum Beispiel: "ol-no"' })
    .regex(
      /^[a-z0-9-]+$/,
      'Gültige Zeichen: Kleinbuchstaben, Ziffern und der Bindestrich.',
    ),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }

  console.log(`Create league ${JSON.stringify(submission.value)}`);

  return json(submission.reply());
}

export default function LeaguesRoute() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <Card>
      <CardHeader>Neue Liga</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form
          id={form.id}
          onSubmit={form.onSubmit}
          method="post"
          className="flex flex-col gap-y-4"
        >
          <TextField
            name={fields.name.name}
            validationBehavior="aria"
            isInvalid={!fields.name.valid}
          >
            <Label>Bezeichnung</Label>
            <Input type="text" name="name" />
            <FieldError>{fields.name.errors}</FieldError>
          </TextField>
          <TextField
            name={fields.shortname.name}
            validationBehavior="aria"
            isInvalid={!fields.shortname.valid}
          >
            <Label>Kürzel</Label>
            <Input type="text" name="shortname" />
            <FieldError>{fields.shortname.errors}</FieldError>
          </TextField>
          <TextField
            name={fields.slug.name}
            validationBehavior="aria"
            isInvalid={!fields.slug.valid}
          >
            <Label>Kennung</Label>
            <Input type="text" name="slug" />
            <FieldError>{fields.slug.errors}</FieldError>
          </TextField>
          <div>
            <Button variant="solid" color="accent" type="submit">
              Speichern
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
