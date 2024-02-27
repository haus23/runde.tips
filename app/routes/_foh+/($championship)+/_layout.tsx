import type { LoaderFunctionArgs } from '@remix-run/node';
import {
  Outlet,
  isRouteErrorResponse,
  redirect,
  useRouteError,
} from '@remix-run/react';
import { getPublishedChampionships } from '#utils/cache.server';
import { db } from '#utils/db.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const championships = await getPublishedChampionships();
  const { championship: slug } = params;

  if (championships.length === 0) {
    return redirect('/willkommen');
  }

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
  return <Outlet />;
}
