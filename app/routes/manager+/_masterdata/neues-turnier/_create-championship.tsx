import { Form } from 'react-aria-components';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Input,
  Label,
  TextField,
} from '#components/ui';

export default function CreateChampionshipRoute() {
  return (
    <Card>
      <CardHeader id="tableLabel">Neues Turnier</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form className="flex flex-col gap-y-4">
          <TextField defaultValue="Hooray" orientation="vertical">
            <Label>Name</Label>
            <Input />
          </TextField>
          <TextField defaultValue="Hooray" orientation="horizontal">
            <Label className="text-base">Turnierkürzel:</Label>
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
