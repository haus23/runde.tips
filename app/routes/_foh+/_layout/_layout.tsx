import { Outlet, json } from '@remix-run/react';
import { getPublishedChampionships } from '#utils/foh/championships.server';

export async function loader() {
  const championships = await getPublishedChampionships();
  return json({ championships });
}

export default function FohLayout() {
  return <Outlet />;
}
