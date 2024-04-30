import { type ActionFunctionArgs, json } from '@remix-run/node';
import { Form } from 'react-aria-components';
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

export const handle = { pageTitle: 'Mannschaften / Vereine' };

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const name = String(formData.get('name'));
  const shortname = String(formData.get('shortname'));
  const slug = String(formData.get('slug'));

  console.log(`Create league ${JSON.stringify({ name, shortname, slug })}`);
  return json(null);
}

export default function TeamsRoute() {
  return (
    <Card>
      <CardHeader>Neue Mannschaft</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form method="post" className="flex flex-col gap-y-4">
          <TextField isRequired>
            <Label>Bezeichnung</Label>
            <Input type="text" name="name" />
            <FieldError />
          </TextField>
          <TextField isRequired>
            <Label>Kurzname</Label>
            <Input type="text" name="shortname" />
            <FieldError />
          </TextField>
          <TextField isRequired pattern="[a-z0-9\-]+">
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
