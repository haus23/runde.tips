import { getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useRef } from 'react';
import { z } from 'zod';
import UI from '#components/ui';
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

  return json(submission.reply({ resetForm: true }));
}

export default function LeaguesRoute() {
  const lastResult = useActionData<typeof action>();

  const shortnameFld = useRef<HTMLInputElement>(null);
  const slugFld = useRef<HTMLInputElement>(null);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  });

  function inferShortname() {
    form.update({ name: fields.shortname.name, value: fields.name.value });
  }

  return (
    <UI.Collapsible defaultOpen>
      <UI.CollapsibleTrigger>Neue Liga</UI.CollapsibleTrigger>
      <UI.Divider />
      <UI.CollapsibleContent className="px-0 sm:px-4">
        <Form
          id={form.id}
          onSubmit={form.onSubmit}
          method="post"
          className="flex flex-col gap-y-4"
        >
          <div>
            <label htmlFor={fields.name.id}>Bezeichnung</label>
            <input
              {...getInputProps(fields.name, { type: 'text' })}
              onBlur={inferShortname}
              autoComplete="league name"
            />
            <div>{fields.name.errors}</div>
          </div>
          <div>
            <label htmlFor={fields.shortname.id}>Kürzel</label>
            <input
              ref={shortnameFld}
              {...getInputProps(fields.shortname, { type: 'text' })}
              autoComplete="league short name"
            />
            <div>{fields.shortname.errors}</div>
          </div>
          <div>
            <label htmlFor={fields.slug.id}>Kennung</label>
            <input
              ref={slugFld}
              {...getInputProps(fields.slug, { type: 'text' })}
              autoComplete="league slug"
            />
            <div>{fields.slug.errors}</div>
          </div>
          <div>
            <UI.Button variant="solid" color="accent" type="submit">
              Speichern
            </UI.Button>
          </div>
        </Form>
      </UI.CollapsibleContent>
    </UI.Collapsible>
  );
}
