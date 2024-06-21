import { useForm, useInputControl } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useActionData, useLoaderData, useSubmit } from '@remix-run/react';
import type { FormEvent } from 'react';
import { Form } from 'react-aria-components';
import UI from '#components/ui';
import { apiCommandBus } from '#utils/api/command-bus.server.js';
import { createChampionshipSchema as schema } from '#utils/api/commands.js';
import { db } from '#utils/db.server';
import { redirectWithToast } from '#utils/toast/toast.server';

export const handle = { pageTitle: 'Neues Turnier' };

export async function loader() {
  const lastChampionship = await db.championship.findFirst({
    orderBy: { nr: 'desc' },
  });
  const rulesets = await db.ruleset.findMany();

  return json({ nextNr: (lastChampionship?.nr || 0) + 1, rulesets });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json(submission.reply());
  }

  // Validate unique slug
  const championship = await db.championship.findFirst({
    where: { slug: submission.value.slug },
  });
  if (championship) {
    return json(
      submission.reply({ fieldErrors: { slug: ['Kennung schon vergeben'] } }),
    );
  }

  apiCommandBus.emit({
    name: 'CREATE_CHAMPIONSHIP',
    payload: submission.value,
  });

  return redirectWithToast(`../${submission.value.slug}`, {
    type: 'success',
    text: 'Turnier angelegt',
  });
}

export default function CreateChampionshipRoute() {
  const { nextNr, rulesets } = useLoaderData<typeof loader>();
  const lastResult = useActionData<typeof action>();
  const submit = useSubmit();

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onBlur',
    defaultValue: { nr: nextNr },
  });

  const slugField = useInputControl(fields.slug);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submit(event.currentTarget);
  }

  const validationErrors =
    lastResult?.error &&
    (Object.fromEntries(
      Object.entries(lastResult.error).filter(([_, errors]) => errors !== null),
    ) as Record<string, string[]>);

  function handleSlug() {
    if (!fields.slug.dirty) {
      const name = fields.name.value || '';
      const stdPattern = /^([HRWE]).*(\d{2})\/?(\d{2})$/;
      const match = name.match(stdPattern);
      if (match?.[1] && match[2] && match[3]) {
        const secondLetter = match[0].match(/[HR]/) ? 'r' : 'm';
        const slug = `${match[1].toLowerCase() + secondLetter}${match[2] + match[3]}`;
        slugField.change(slug);
      }
    }
  }

  return (
    <UI.Card>
      <UI.CardHeader id="tableLabel">Turnier</UI.CardHeader>
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
            <UI.TextField isRequired name={fields.name.name}>
              <UI.Label>Bezeichnung</UI.Label>
              <UI.Input type="text" placeholder="Hinrunde 23/24 oder EM 2024" />
              <UI.FieldError />
            </UI.TextField>
            <UI.TextField
              isRequired
              name={fields.slug.name}
              pattern="[a-z]{2}\d{4}"
            >
              <UI.Label>Kennung</UI.Label>
              <UI.Input type="text" onFocus={handleSlug} />
              <UI.Description hideOnError={false}>
                Abkürzung in der Form hr2324 (Zwei Kleinbuchstaben und vier
                Ziffern)
              </UI.Description>
              <UI.FieldError />
            </UI.TextField>
            <UI.TextField
              isRequired
              name={fields.nr.name}
              defaultValue={fields.nr.initialValue}
            >
              <UI.Label>Nummer</UI.Label>
              <UI.Input type="number" />
              <UI.FieldError />
            </UI.TextField>
            <UI.Select
              label="Regelwerk"
              isRequired
              items={rulesets}
              name={fields.rulesetId.name}
              placeholder="Regelwerk auswählen"
            >
              {(item) => (
                <UI.SelectItem id={item.id}>{item.name}</UI.SelectItem>
              )}
            </UI.Select>
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
