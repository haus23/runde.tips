import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { type FormEvent, useEffect, useRef, useState } from 'react';
import { z } from 'zod';

import { setMatchResults } from '#api/use-cases/set-match-results';
import UI from '#components/ui';
import { useChampionship } from '#utils/app/manager/use-championship';
import { requireAdmin } from '#utils/auth/auth.server';
import { db } from '#utils/db.server';
import { toast } from '#utils/toast/toast.client';
import { jsonWithToast } from '#utils/toast/toast.server';

const schema = z.array(
  z.object({ matchId: z.number(), result: z.string().regex(/^\d+:\d+$/) }),
);

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

export async function action({ request }: ActionFunctionArgs) {
  const data = await request.json();
  const changedResults = schema.safeParse(data);

  if (!changedResults.success) {
    return jsonWithToast(
      { success: false },
      {
        type: 'error',
        text: 'Ungültige Ergebnisse.',
      },
    );
  }

  await setMatchResults(changedResults.data);

  return jsonWithToast(
    { success: false },
    {
      type: 'success',
      text: 'Ergebnisse gespeichert.',
    },
  );
}

function isValid(result: string) {
  return !result || /^\d+:\d+$/.test(result);
}

export default function ResultsRoute() {
  // DOM
  const frm = useRef<HTMLFormElement>(null);

  // Loader
  const { rounds, matches } = useLoaderData<typeof loader>();
  const { currentChampionship } = useChampionship();

  // Derived State
  const [selectedRoundIx, setSelectedRoundIx] = useState(
    currentChampionship?.completed ? 0 : rounds.length - 1,
  );
  const [results, setResults] = useState(
    matches.map((m) => ({
      ...m,
      currentResult: m.result,
      shouldCalculate: false,
    })),
  );

  // Action
  const fetcher = useFetcher();
  useEffect(() => {
    if (fetcher.state === 'submitting') {
      setResults((results) =>
        results.map((m) =>
          m.shouldCalculate
            ? {
                ...m,
                shouldCalculate: false,
                result: m.currentResult,
              }
            : m,
        ),
      );
    }
  }, [fetcher.state]);

  function handleTabChange(ix: number) {
    if (
      results.some((r) => r.shouldCalculate) ||
      !frm.current?.checkValidity()
    ) {
      toast('info', 'Erst speichern bitte.');
      return;
    }
    setSelectedRoundIx(ix);
  }

  function handleResultChange(matchId: number, result: string) {
    setResults((results) =>
      results.map((m) =>
        m.id !== matchId
          ? m
          : {
              ...m,
              currentResult: result,
              shouldCalculate: m.result !== result && isValid(result),
            },
      ),
    );
  }

  function toggleShouldCalculate(matchId: number, shouldCalculate: boolean) {
    setResults((results) =>
      results.map((m) =>
        m.id !== matchId
          ? m
          : {
              ...m,
              shouldCalculate,
              currentResult: shouldCalculate ? m.currentResult : m.result,
            },
      ),
    );
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const changedResults = schema.parse(
      results
        .filter((r) => r.shouldCalculate)
        .map((r) => ({ matchId: r.id, result: r.currentResult })),
    );
    fetcher.submit(changedResults, {
      method: 'post',
      encType: 'application/json',
    });
  }

  return (
    <fetcher.Form ref={frm} method="post" onSubmit={handleSubmit}>
      <UI.Card>
        <UI.CardHeader className="sticky top-0 z-10 flex items-center justify-between rounded-t-xl bg-content text-base">
          <span className="text-xl">Ergebnisse</span>
          <UI.Button
            variant="solid"
            color="accent"
            isDisabled={!results.some((r) => r.shouldCalculate)}
            type="submit"
          >
            Speichern
          </UI.Button>
        </UI.CardHeader>
        <UI.Divider />
        <UI.CardContent className="px-0 sm:px-4">
          <UI.TabGroup
            selectedIndex={selectedRoundIx}
            onChange={handleTabChange}
          >
            <UI.TabList label="Runde">
              {rounds.map((r) => (
                <UI.Tab key={r.id}>{r.nr}</UI.Tab>
              ))}
            </UI.TabList>
            <UI.TabPanels>
              {rounds.map((r) => (
                <UI.TabPanel key={r.id}>
                  <UI.Table aria-label={`Spiele der Runde ${r.nr}`}>
                    <UI.TableHeader>
                      <UI.Column className="text-right">Nr</UI.Column>
                      <UI.Column className="w-full text-left">Spiel</UI.Column>
                      <UI.Column className="sr-only">Berechnen</UI.Column>
                      <UI.Column>Ergebnis</UI.Column>
                    </UI.TableHeader>
                    <UI.TableBody>
                      {results
                        .filter((m) => m.roundId === r.id)
                        .map((match) => (
                          <UI.Row key={match.id}>
                            <UI.Cell className="text-right">{match.nr}</UI.Cell>
                            <UI.Cell role="rowheader">
                              <span className="hidden sm:block">{`${match.hometeam?.name} - ${match.awayteam?.name}`}</span>
                              <span className="block sm:hidden">{`${match.hometeam?.shortname} - ${match.awayteam?.shortname}`}</span>
                            </UI.Cell>
                            <UI.Cell className="pr-0 md:pr-0">
                              <UI.Checkbox
                                isSelected={match.shouldCalculate}
                                onChange={(dirty) =>
                                  toggleShouldCalculate(match.id, dirty)
                                }
                              />
                            </UI.Cell>
                            <UI.Cell className="text-center">
                              <UI.TextField
                                validationBehavior="aria"
                                value={match.currentResult}
                                onChange={(result) =>
                                  handleResultChange(match.id, result)
                                }
                                aria-label={`Ergebnis ${match.hometeam?.shortname} - ${match.awayteam?.shortname} (Spiel Nr ${match.nr})`}
                                pattern="\d+:\d+"
                                className="group relative mx-auto w-12"
                                orientation="horizontal"
                                isInvalid={!isValid(match.currentResult)}
                              >
                                <UI.Input className={'text-center'} />
                                <UI.FieldError className="-right-2.5 absolute top-1/3">
                                  *
                                </UI.FieldError>
                              </UI.TextField>
                            </UI.Cell>
                          </UI.Row>
                        ))}
                    </UI.TableBody>
                  </UI.Table>
                </UI.TabPanel>
              ))}
            </UI.TabPanels>
          </UI.TabGroup>
        </UI.CardContent>
      </UI.Card>
    </fetcher.Form>
  );
}
