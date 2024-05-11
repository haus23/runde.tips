import { setMatchResult } from './match-result';

export async function setMatchResults(
  results: { matchId: number; result: string }[],
) {
  await Promise.all(results.map((result) => setMatchResult(result)));
}
