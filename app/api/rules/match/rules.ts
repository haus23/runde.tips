import { z } from 'zod';

const matchRuleNames = [
  'keine-besonderheiten',
  'alleiniger-treffer-drei-punkte',
] as const;

const matchRuleSchema = z.enum(matchRuleNames);

export type MatchRuleId = z.infer<typeof matchRuleSchema>;

export const matchRules: RuleDescriptions<MatchRuleId> = {
  'keine-besonderheiten': {
    name: 'Keine Besonderheiten',
    description: `
        Es gibt keine Sonderregeln für einzelne Spiele.
      `,
  },
  'alleiniger-treffer-drei-punkte': {
    name: 'Alleiniger Treffer gibt drei Punkte',
    description: `
        Falls ein Spieler als einziger für ein Spiel Punkte erhält, bekommt er drei zusätzliche Punkte.
      `,
  },
};
