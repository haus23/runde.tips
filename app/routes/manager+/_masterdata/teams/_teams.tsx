import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useRef, useState } from 'react';
import { Form } from 'react-aria-components';
import { z } from 'zod';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Description,
  Divider,
  FieldError,
  Input,
  Label,
  TextField,
} from '#components/ui';
import { slugify } from '#utils/misc.js';

export const handle = { pageTitle: 'Mannschaften / Vereine' };

const schema = z.object({
  name: z.string({ message: 'Notwendig. Zum Beispiel: "Energie"' }),
  shortname: z.string({ message: 'Notwendig. Zum Beispiel: "Energie"' }),
  slug: z
    .string({ message: 'Notwendig. Zum Beispiel: "energie"' })
    .regex(
      /^[a-z0-9-]+$/,
      'Gültige Zeichen: Kleinbuchstaben, Ziffern und der Bindestrich.',
    ),
});
type SchemaType = z.infer<typeof schema>;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = String(formData.get('name'));
  const shortname = String(formData.get('shortname'));
  const slug = String(formData.get('slug'));

  console.log(`Create league ${JSON.stringify({ name, shortname, slug })}`);
  return json(null);
}

export default function TeamsRoute() {
  const [team, setTeam] = useState({
    name: '',
    shortname: '',
    slug: '',
  });

  const dirtyFields = useRef<
    Partial<Record<keyof SchemaType, boolean | undefined>>
  >({});

  function changeField(name: keyof SchemaType) {
    return (value: string) => setTeam((team) => ({ ...team, [name]: value }));
  }

  function inferShortname() {
    if (!dirtyFields.current.shortname)
      setTeam((team) => ({ ...team, shortname: team.name }));
  }

  function inferSlug() {
    const slug = slugify(team.shortname);
    if (!dirtyFields.current.slug) setTeam((team) => ({ ...team, slug }));
  }

  return (
    <Card>
      <CardHeader>Neue Mannschaft</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form method="post" className="flex flex-col gap-y-4">
          <TextField
            isRequired
            value={team.name}
            onChange={changeField('name')}
            onBlur={inferShortname}
          >
            <Label>Bezeichnung</Label>
            <Input type="text" name="name" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            value={team.shortname}
            onInput={() => {
              dirtyFields.current.shortname = true;
            }}
            onChange={changeField('shortname')}
            onBlur={inferSlug}
          >
            <Label>Kurzname</Label>
            <Input type="text" name="shortname" />
            <FieldError />
          </TextField>
          <TextField
            isRequired
            pattern="[a-z0-9\-]+"
            value={team.slug}
            onInput={() => {
              dirtyFields.current.slug = true;
            }}
            onChange={changeField('slug')}
          >
            <Label>Kennung</Label>
            <Input type="text" name="slug" />
            <Description hideOnError={false}>
              Gültige Zeichen: Kleinbuchstaben, Ziffern und der Bindestrich.
            </Description>
            <FieldError />
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
