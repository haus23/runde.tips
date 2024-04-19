import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useReducer } from 'react';
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
import { invariant } from '#utils/misc.js';

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireAdmin(request);
  const { championship: slug } = params;
  const rounds = await db.round.findMany({
    where: { championship: { slug } },
    select: { id: true, nr: true },
  });
  const matches = await db.match.findMany({
    where: { championship: { slug } },
    include: {
      hometeam: true,
      awayteam: true,
    },
    orderBy: { nr: 'asc' },
  });
  return json({ rounds, matches });
}

type ResultsState = Array<{
  id: number;
  original: string;
  changed?: string;
  dirty: boolean;
}>;

type ResultsChangeAction = { id: number; result: string };

function resultsReducer(state: ResultsState, action: ResultsChangeAction) {
  return state.map((r) =>
    r.id === action.id
      ? { ...r, changed: action.result, dirty: r.original !== action.result }
      : r,
  );
}

export default function ResultsRoute() {
  const { rounds, matches } = useLoaderData<typeof loader>();
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
                  <TableBody
                    items={matches.filter((m) => m.roundId === round.id)}
                  >
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
                            aria-label={`Ergebnis ${match.hometeam?.shortname} - ${match.awayteam?.shortname} (Spiel Nr ${match.nr})`}
                            pattern="\d+:\d+"
                            className="relative mx-auto w-12"
                            orientation="horizontal"
                          >
                            <Input />
                            <FieldError className="-right-2.5 absolute top-1/3">
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
