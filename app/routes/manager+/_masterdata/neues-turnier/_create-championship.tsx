import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData, useSubmit } from '@remix-run/react';
import type { FormEvent } from 'react';
import { Form } from 'react-aria-components';
import { z } from 'zod';
import UI from '#components/ui';
import { jsonWithToast } from '#utils/toast/toast.server.js';

const schema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z]{2}\d{4}$/),
  nr: z.number().int(),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }

  if (submission.value.slug.startsWith('ss')) {
    return json(
      submission.reply({ fieldErrors: { slug: ['Kennung schon vergeben'] } }),
    );
  }

  console.log(`Creating ${JSON.stringify(submission.payload)}`);
  return jsonWithToast(submission.reply, {
    type: 'success',
    text: 'Turnier angelegt',
  });
}

export default function CreateChampionshipRoute() {
  const lastResult = useActionData<typeof action>();
  const submit = useSubmit();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onBlur',
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(event.currentTarget);
  }

  const validationErrors =
    lastResult?.error &&
    (Object.fromEntries(
      Object.entries(lastResult.error).filter(([_, errors]) => errors !== null),
    ) as Record<string, string[]>);

  return (
    <UI.Card>
      <UI.CardHeader id="tableLabel">Neues Turnier</UI.CardHeader>
      <UI.Divider />
      <UI.CardContent className="px-0 sm:px-4">
        <div>
          <Form
            validationErrors={validationErrors}
            method="post"
            className="flex flex-col gap-y-4"
            id={form.id}
            onSubmit={handleSubmit}
          >
            <UI.TextField>
              <UI.Label>Bezeichnung</UI.Label>
              <UI.Input
                required
                type="text"
                name={fields.name.name}
                placeholder="Hinrunde 23/24 oder EM 2024"
              />
              <UI.FieldError />
            </UI.TextField>
            <UI.TextField isRequired pattern="[a-z]{2}\d{4}">
              <UI.Label>Kennung</UI.Label>
              <UI.Input type="text" name={fields.slug.name} />
              <UI.Description hideOnError={false}>
                Abkürzung in der Form hr2324 (Zwei Kleinbuchstaben und vier
                Ziffern)
              </UI.Description>
              <UI.FieldError />
            </UI.TextField>
            <UI.TextField isRequired>
              <UI.Label>Nummer</UI.Label>
              <UI.Input type="number" name={fields.nr.name} />
              <UI.FieldError />
            </UI.TextField>
            <div>
              <UI.Button variant="solid" color="accent" type="submit">
                Anlegen
              </UI.Button>
            </div>
          </Form>
        </div>
      </UI.CardContent>
    </UI.Card>
  );
}
