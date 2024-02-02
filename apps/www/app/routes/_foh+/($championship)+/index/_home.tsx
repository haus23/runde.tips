import { useFetcher } from '@remix-run/react';
import { Button } from '@tipprunde/ui';

export function meta() {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
}

export default function HomeRoute() {
  const fetcher = useFetcher();

  function setTheme(colorScheme: string) {
    fetcher.submit(
      { colorScheme },
      { method: 'POST', action: '/action/set-theme' },
    );
  }
  return (
    <div>
      <h2 className="text-3xl font-medium">Home</h2>
      <div className="flex justify-between">
        <Button onPress={() => setTheme('light')}>Light</Button>
        <Button onPress={() => setTheme('dark')}>Dark</Button>
        <Button onPress={() => setTheme('system')}>System</Button>
      </div>
    </div>
  );
}
