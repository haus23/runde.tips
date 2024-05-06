import { type LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
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
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableHeader,
  TextField,
} from '#components/ui';
import { requireAdmin } from '#utils/auth/auth.server';
import { db } from '#utils/db.server';
import { useCurrentChampionship } from '#utils/manager/championship.context';

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

export default function ResultsRoute() {
  const { rounds, matches } = useLoaderData<typeof loader>();
  const { championship } = useCurrentChampionship();

  const [results, setResults] = useState(
    matches.map((m) => ({ ...m, currentResult: m.result })),
  );

  function handleChange(matchId: number, result: string) {
    setResults((results) =>
      results.map((m) =>
        m.id !== matchId ? m : { ...m, currentResult: result },
      ),
    );
  }

  return (
    <Card>
      <CardHeader id="tableLabel">Ergebnisse</CardHeader>
      <Divider />
      <CardContent className="px-0 sm:px-4">
        <TabGroup
          defaultIndex={championship?.completed ? 0 : rounds.length - 1}
        >
          <TabList label="Runde">
            {rounds.map((r) => (
              <Tab key={r.id}>{r.nr}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {rounds.map((r) => (
              <TabPanel key={r.id}>
                <Table aria-label={`Spiele der Runde ${r.nr}`}>
                  <TableHeader>
                    <Column className="text-right">Nr</Column>
                    <Column className="w-full text-left">Spiel</Column>
                    <Column>Ergebnis</Column>
                  </TableHeader>
                  <TableBody>
                    {results
                      .filter((m) => m.roundId === r.id)
                      .map((match) => (
                        <Row key={match.id}>
                          <Cell className="text-right">{match.nr}</Cell>
                          <Cell role="rowheader">
                            <span className="hidden sm:block">{`${match.hometeam?.name} - ${match.awayteam?.name}`}</span>
                            <span className="block sm:hidden">{`${match.hometeam?.shortname} - ${match.awayteam?.shortname}`}</span>
                          </Cell>
                          <Cell className="text-center">
                            <TextField
                              value={match.currentResult}
                              onChange={(result) =>
                                handleChange(match.id, result)
                              }
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
                      ))}
                  </TableBody>
                </Table>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </CardContent>
    </Card>
  );
}
