import type { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import { db } from '#utils/db.server';
import { useChampionships } from '#utils/foh/use-championships';

export async function loader({ params }: LoaderFunctionArgs) {
  const { championship: slug } = params;

  // Route requirement: route param championship is a correct championship slug
  if (slug) {
    const championship = await db.championship.findUnique({ where: { slug } });
    if (!championship) {
      throw new Response(null, {
        status: 404,
        statusText: 'Not found',
      });
    }
  }

  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log(error);
  }
  return <div>{JSON.stringify(error)}</div>;
}

export default function ChampionshipLayout() {
  const championships = useChampionships();

  return championships && championships.length > 0 ? (
    <Outlet />
  ) : (
    <div className="bg-app-subtle sm:rounded-lg p-4 flex flex-col gap-y-4 max-w-3xl mx-auto mt-4 text-lg">
      <h2 className="text-3xl font-medium">Marie 23 Tipprunde</h2>
      <p>Willkommen bei unserer kleinen Fussball-Tipprunde!</p>
      <p>
        Leider gibt es noch keine Turniere und nichts zu tippen. Wir warten
        einfach auf die erste Runde, die von der Spielleitung freigeschaltet
        wird. Bis dahin empfehle ich ein kühles Blondes am Lieblingstresen
        deiner Stadt.
      </p>
    </div>
  );
}
