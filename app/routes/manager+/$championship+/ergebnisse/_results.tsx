import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Collection } from 'react-aria-components';
import {
  Card,
  CardContent,
  CardHeader,
  Cell,
  Column,
  Divider,
  FieldError,
  Input,
  Row,
  Tab,
  TabList,
  TabPanel,
  Table,
  TableBody,
  TableHeader,
  Tabs,
  TextField,
} from '#components/ui';
import { requireAdmin } from '#utils/auth/auth.server';
import { db } from '#utils/db.server';
import { useCurrentChampionship } from '#utils/manager/championship.context.js';

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const { championship: slug } = params;
  const championshipRounds = await db.round.findMany({
    where: { championship: { slug } },
    include: {
      matches: {
        include: {
          hometeam: true,
          awayteam: true,
        },
      },
    },
  });
  return json({ rounds: championshipRounds });
}

export default function ResultsRoute() {
  const { rounds } = useLoaderData<typeof loader>();
  const { championship } = useCurrentChampionship();

  return (
    <Card>
      <CardHeader id="tableLabel">Ergebnisse</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <Tabs
          defaultSelectedKey={
            !championship?.completed ? rounds.at(-1)?.id : rounds.at(0)?.id
          }
        >
          <TabList label="Runde" items={rounds}>
            {(round) => <Tab>{round.nr}</Tab>}
          </TabList>
          <Collection items={rounds}>
            {(round) => (
              <TabPanel className="grid">
                <Table aria-label={`Spiele der Runde ${round.nr}`}>
                  <TableHeader>
                    <Column className="text-right">Nr</Column>
                    <Column isRowHeader className="w-full text-left">
                      Spiel
                    </Column>
                    <Column>Ergebnis</Column>
                  </TableHeader>
                  <TableBody items={round.matches}>
                    {(match) => (
                      <Row>
                        <Cell className="text-right">{match.nr}</Cell>
                        <Cell>
                          <span className="hidden sm:block">{`${match.hometeam?.name} - ${match.awayteam?.name}`}</span>
                          <span className="block sm:hidden">{`${match.hometeam?.shortname} - ${match.awayteam?.shortname}`}</span>
                        </Cell>
                        <Cell className="text-center">
                          <TextField
                            defaultValue={match.result}
                            aria-label="Spielergebnis"
                            pattern="\d+:\d+"
                            className="relative"
                          >
                            <Input className="w-12" />
                            <FieldError className="absolute top-1/3 right-0">
                              *
                            </FieldError>
                          </TextField>
                        </Cell>
                      </Row>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
            )}
          </Collection>
        </Tabs>
      </CardContent>
    </Card>
  );
}
