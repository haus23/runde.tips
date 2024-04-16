import { z } from 'zod';

export class Result {
  get goalDiff() {
    if (this.isEmpty) {
      throw new Error('Result is empty');
    }
    return this.homeGoals - this.awayGoals;
  }
  get totoTendence() {
    return this.goalDiff > 0 ? 1 : this.goalDiff < 0 ? 2 : 0;
  }

  private constructor(isEmpty: true);
  private constructor(isEmpty: false, homeGoals: number, awayGoals: number);
  private constructor(
    public readonly isEmpty: boolean,
    public readonly homeGoals = 0,
    public readonly awayGoals = 0,
  ) {}

  static makeFrom(str?: string): Result {
    const isEmpty = !str;
    if (!isEmpty) {
      const goals = str.split(':');
      if (goals.length !== 2) {
        throw new Error('Result parse error: missing colon');
      }

      const homeGoals = z
        .string()
        .transform((val) => Number.parseInt(val))
        .pipe(z.number())
        .safeParse(goals[0]);
      const awayGoals = z
        .string()
        .transform((val) => Number.parseInt(val))
        .pipe(z.number())
        .safeParse(goals[1]);

      if (!homeGoals.success || !awayGoals.success) {
        throw new Error('Result parse error: invalid goals');
      }
      return new Result(false, homeGoals.data, awayGoals.data);
    }
    return new Result(isEmpty);
  }
}
