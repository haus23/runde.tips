import type { Tip } from '@prisma/client';
import type { TipRuleId } from './rules';

type TipCalculationFn = (tip: Tip, resultString: string) => number;

function parseResultString(result: string):
  | { isEmpty: true }
  | {
      isEmpty: false;
      totoTendence: number;
      goalDiff: number;
      homeGoals: number;
      awayGoals: number;
    } {
  if (!result) return { isEmpty: true };

  const parsedData = /^(\d+):(\d)+$/.exec(result);
  if (!parsedData) throw new Error(`Invalid result: ${result}`);

  const homeGoals = Number(parsedData[1]);
  const awayGoals = Number(parsedData[2]);
  const goalDiff = homeGoals - awayGoals;
  const totoTendence = goalDiff > 0 ? 1 : goalDiff < 0 ? 2 : 0;

  return { isEmpty: false, totoTendence, goalDiff, homeGoals, awayGoals };
}

export const tipCalculator: RuleCalculators<TipRuleId, TipCalculationFn> = {
  'drei-oder-ein-punkt-joker-verdoppelt': (tip, resultString) => {
    const tipData = parseResultString(tip.tip);
    const resultData = parseResultString(resultString);

    if (tipData.isEmpty || resultData.isEmpty) return 0;
    if (tipData.totoTendence !== resultData.totoTendence) return 0;

    let points = 1;

    if (tipData.goalDiff === resultData.goalDiff) {
      if (tipData.homeGoals === resultData.homeGoals) {
        points = 3;
      }
    }

    if (tip.joker) points *= 2;

    return points;
  },
  'drei-zwei-oder-ein-punkt-joker-verdoppelt': (tip, resultString) => {
    const tipData = parseResultString(tip.tip);
    const resultData = parseResultString(resultString);

    if (tipData.isEmpty || resultData.isEmpty) return 0;
    if (tipData.totoTendence !== resultData.totoTendence) return 0;

    let points = 1;

    if (tipData.goalDiff === resultData.goalDiff) {
      if (tipData.homeGoals === resultData.homeGoals) {
        points = 3;
      } else {
        points = 2;
      }
    }

    if (tip.joker) points *= 2;

    return points;
  },
};
