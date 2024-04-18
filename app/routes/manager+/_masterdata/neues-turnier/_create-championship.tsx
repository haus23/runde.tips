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

export default function CreateChampionshipRoute() {
  return (
    <Card>
      <CardHeader id="tableLabel">Neues Turnier</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Form className="flex flex-col gap-y-4">
          <TextField orientation="vertical">
            <Label>Name</Label>
            <Input placeholder="Zum Beispiel Hinrunde 23/24" required />
            <Description>Das ist der Titel des Turniers</Description>
            <FieldError />
          </TextField>
          <TextField orientation="horizontal">
            <Label className="mt-1 self-start text-base">Turnierkürzel:</Label>
            <div className="flex grow flex-col gap-y-1.5">
              <Input required pattern="[a-z]{2}\d{4}" />
              <Description hideOnError={false}>
                Abkürzung in der Form hr2324 (Zwei Buchstaben und vier Ziffern)
              </Description>
              <FieldError />
            </div>
          </TextField>
          <div>
            <Button variant="solid" color="accent" type="submit">
              Anlegen
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
