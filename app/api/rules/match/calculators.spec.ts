import type { Match, Tip } from '@prisma/client';
import { describe, expect, test } from 'vitest';
import { matchCalculator } from './calculators';
import { matchRules } from './rules';

const mockTips = [
  { tip: '3:2', joker: false },
  { tip: '2:1', joker: true },
  { tip: '1:1', joker: false },
] as Tip[];

describe(`Regel ${matchRules['keine-besonderheiten'].name}`, () => {
  test('Punkte werden korrekt addiert', async () => {
    const { points } = await matchCalculator['keine-besonderheiten'](
      {} as Match,
      mockTips,
      'drei-zwei-oder-ein-punkt-joker-verdoppelt',
      '3:2',
    );
    expect(points).toBe(7);
  });
});

describe(`Regel ${matchRules['alleiniger-treffer-drei-punkte'].name}`, () => {
  test('Alleiniger Treffer wird mit Bonus (3 Punkte) belohnt', async () => {
    const { tips } = await matchCalculator['alleiniger-treffer-drei-punkte'](
      {} as Match,
      mockTips,
      'drei-zwei-oder-ein-punkt-joker-verdoppelt',
      '1:1',
    );
    expect(tips[2]?.points).toBe(6);
  });

  test('Punkte werden korrekt addiert incl Bonus für alleinigen Treffer', async () => {
    const { points } = await matchCalculator['alleiniger-treffer-drei-punkte'](
      {} as Match,
      mockTips,
      'drei-zwei-oder-ein-punkt-joker-verdoppelt',
      '1:1',
    );
    expect(points).toBe(6);
  });
});
