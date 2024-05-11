type RuleCalculators<T, TCalculationFn> = {
  [K in T]: TCalculationFn;
};

type RuleDescriptions<T> = {
  [K in T]: { name: string; description: string };
};
