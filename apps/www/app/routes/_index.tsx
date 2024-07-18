import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'runde.tips' }];
};

export default function Index() {
  return <h1 className="p-4 font-semibold text-3xl">runde.tips</h1>;
}
