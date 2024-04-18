import { Form } from 'react-aria-components';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Input,
  TextField,
} from '#components/ui';

export default function CreateChampionshipRoute() {
  return (
    <Card>
      <CardHeader id="tableLabel">Neues Turnier</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form className="flex flex-col gap-y-4">
          <TextField defaultValue="Hooray" aria-label="Turnierkürzel">
            <Input />
          </TextField>
          <div>
            <Button variant="solid" color="accent">
              Anlegen
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
