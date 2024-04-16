import { describe, expect, it } from 'vitest';
import { Result } from './result';

describe('A result object', () => {
  it('can be created via factory', () => {
    expect(Result.makeFrom()).toBeInstanceOf(Result);
  });

  it('is empty if created with undefined result string', () => {
    const result = Result.makeFrom(undefined);
    expect(result.isEmpty).toBe(true);
  });

  it('is empty if created with empty result string', () => {
    const result = Result.makeFrom('');
    expect(result.isEmpty).toBe(true);
  });

  it('throws with result string without colon', () => {
    expect(() => Result.makeFrom(' ')).toThrowError('colon');
  });

  it('throws with result string with invalid goals', () => {
    expect(() => Result.makeFrom('2:')).toThrowError('goals');
  });

  it('parses correct goals in result string', () => {
    const result = Result.makeFrom('4:3');
    expect(result.homeGoals).toBe(4);
    expect(result.awayGoals).toBe(3);
  });

  it('has the correct api metrics', () => {
    const result1 = Result.makeFrom('4:3');
    expect(result1.totoTendence).toBe(1);
    expect(result1.goalDiff).toBe(1);
    const result2 = Result.makeFrom('4:4');
    expect(result2.totoTendence).toBe(0);
    expect(result2.goalDiff).toBe(0);
    const result3 = Result.makeFrom('2:4');
    expect(result3.totoTendence).toBe(2);
    expect(result3.goalDiff).toBe(-2);
  });
});
