import { Button } from '@tipprunde/ui';
import { useTheme } from '@tipprunde/utils/theme';

export function meta() {
  return [
    { title: 'runde.tips' },
    { name: 'description', content: 'Haus23 Tipprunde' },
  ];
}

export default function HomeRoute() {
  const { setColorScheme } = useTheme();

  return (
    <div>
      <h2 className="text-3xl font-medium">Home</h2>
      <div className="flex justify-between">
        <Button onPress={() => setColorScheme('light')}>Light</Button>
        <Button onPress={() => setColorScheme('dark')}>Dark</Button>
        <Button onPress={() => setColorScheme('system')}>System</Button>
      </div>
    </div>
  );
}
