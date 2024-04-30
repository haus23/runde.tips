import { type ActionFunctionArgs, json } from '@remix-run/node';
import { Form } from 'react-aria-components';
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

export const handle = { pageTitle: 'Mannschaften / Vereine' };

export async function action({ request }: ActionFunctionArgs) {
  return json(null);
}

export default function TeamsRoute() {
  return (
    <Card>
      <CardHeader>Neue Mannschaft</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form method="post" className="flex flex-col gap-y-4">
          <TextField>
            <Label>Bezeichnung</Label>
            <Input required type="text" name="name" />
            <FieldError />
          </TextField>
          <TextField>
            <Label>Kurzname</Label>
            <Input required type="text" name="shortname" />
            <FieldError />
          </TextField>
          <TextField>
            <Label>Kennung</Label>
            <Input required type="text" name="slug" />
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
