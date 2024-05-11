import { expect, test, vi } from 'vitest';
import { setMatchResults } from './index';
import { setMatchResult } from './match-result';

vi.mock('./match-result.ts', async (importOriginal) => {
  const mod = await importOriginal<typeof import('./match-result')>();
  return {
    ...mod,
    setMatchResult: vi.fn(),
  };
});

test('Calls setMatchResult for every changed result', async () => {
  const matchResults = [
    { matchId: 17, result: '1:1' },
    { matchId: 42, result: '4:0' },
  ];

  setMatchResults(matchResults);

  expect(setMatchResult).toBeCalledTimes(2);
  expect(setMatchResult).toBeCalledWith(matchResults[0]);
  expect(setMatchResult).toBeCalledWith(matchResults[1]);
});
