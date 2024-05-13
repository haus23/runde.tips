import type { Tip } from '@prisma/client';
import { describe, expect, test } from 'vitest';
import { tipCalculator } from './calculators';
import { type TipRuleId, tipRules } from './rules';

describe(`Regel: ${tipRules['drei-oder-ein-punkt-joker-verdoppelt'].name}`, () => {
  const tipRuleId: TipRuleId = 'drei-oder-ein-punkt-joker-verdoppelt';

  test('Offenes Spiel -> 0 Punkte', () => {
    expect(tipCalculator[tipRuleId]({ tip: '' } as Tip, '1:1')).toBe(0);
  });

  const expectedPoints = [3, 6, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0];

  test.each([
    { tip: '3:1', joker: false, expected: 3 },
    { tip: '3:1', joker: true, expected: 6 },
    { tip: '2:1', joker: false, expected: 1 },
    { tip: '2:1', joker: true, expected: 2 },
    { tip: '2:0', joker: false, expected: 1 },
    { tip: '2:0', joker: true, expected: 2 },
    { tip: '0:0', joker: false, expected: 0 },
    { tip: '0:0', joker: true, expected: 0 },
    { tip: '1:3', joker: false, expected: 0 },
    { tip: '1:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 3:1, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '3:1')).toBe(
        expected,
      );
    },
  );

  test.each([
    { tip: '0:2', joker: false, expected: 3 },
    { tip: '0:2', joker: true, expected: 6 },
    { tip: '0:1', joker: false, expected: 1 },
    { tip: '0:1', joker: true, expected: 2 },
    { tip: '2:4', joker: false, expected: 1 },
    { tip: '2:4', joker: true, expected: 2 },
    { tip: '0:0', joker: false, expected: 0 },
    { tip: '0:0', joker: true, expected: 0 },
    { tip: '5:3', joker: false, expected: 0 },
    { tip: '5:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 0:2, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '0:2')).toBe(
        expected,
      );
    },
  );

  test.each([
    { tip: '0:0', joker: false, expected: 3 },
    { tip: '0:0', joker: true, expected: 6 },
    { tip: '1:1', joker: false, expected: 1 },
    { tip: '1:1', joker: true, expected: 2 },
    { tip: '2:2', joker: false, expected: 1 },
    { tip: '2:2', joker: true, expected: 2 },
    { tip: '3:1', joker: false, expected: 0 },
    { tip: '3:1', joker: true, expected: 0 },
    { tip: '1:3', joker: false, expected: 0 },
    { tip: '1:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 0:0, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '0:0')).toBe(
        expected,
      );
    },
  );
});

describe(`Regel: ${tipRules['drei-zwei-oder-ein-punkt-joker-verdoppelt'].name}`, () => {
  const tipRuleId: TipRuleId = 'drei-zwei-oder-ein-punkt-joker-verdoppelt';

  test('Offenes Spiel -> 0 Punkte', () => {
    expect(tipCalculator[tipRuleId]({ tip: '' } as Tip, '1:1')).toBe(0);
  });

  test.each([
    { tip: '3:1', joker: false, expected: 3 },
    { tip: '3:1', joker: true, expected: 6 },
    { tip: '2:1', joker: false, expected: 1 },
    { tip: '2:1', joker: true, expected: 2 },
    { tip: '2:0', joker: false, expected: 2 },
    { tip: '2:0', joker: true, expected: 4 },
    { tip: '0:0', joker: false, expected: 0 },
    { tip: '0:0', joker: true, expected: 0 },
    { tip: '1:3', joker: false, expected: 0 },
    { tip: '1:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 3:1, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '3:1')).toBe(
        expected,
      );
    },
  );

  test.each([
    { tip: '0:2', joker: false, expected: 3 },
    { tip: '0:2', joker: true, expected: 6 },
    { tip: '0:1', joker: false, expected: 1 },
    { tip: '0:1', joker: true, expected: 2 },
    { tip: '2:4', joker: false, expected: 2 },
    { tip: '2:4', joker: true, expected: 4 },
    { tip: '0:0', joker: false, expected: 0 },
    { tip: '0:0', joker: true, expected: 0 },
    { tip: '5:3', joker: false, expected: 0 },
    { tip: '5:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 0:2, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '0:2')).toBe(
        expected,
      );
    },
  );

  test.each([
    { tip: '0:0', joker: false, expected: 3 },
    { tip: '0:0', joker: true, expected: 6 },
    { tip: '1:1', joker: false, expected: 2 },
    { tip: '1:1', joker: true, expected: 4 },
    { tip: '2:2', joker: false, expected: 2 },
    { tip: '2:2', joker: true, expected: 4 },
    { tip: '3:1', joker: false, expected: 0 },
    { tip: '3:1', joker: true, expected: 0 },
    { tip: '1:3', joker: false, expected: 0 },
    { tip: '1:3', joker: true, expected: 0 },
    { tip: '', joker: false, expected: 0 },
    { tip: '', joker: true, expected: 0 },
  ])(
    'Spielergebnis: 0:0, Tipp $tip mit Joker $joker bringt $expected Punkte',
    ({ tip, joker, expected }) => {
      expect(tipCalculator[tipRuleId]({ tip, joker } as Tip, '0:0')).toBe(
        expected,
      );
    },
  );
});
