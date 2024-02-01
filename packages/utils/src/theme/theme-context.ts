import { createContext } from 'react';
import type { ColorScheme } from './types';

type ThemeContextType = {
  clientHint: ColorScheme | undefined;
  colorScheme: ColorScheme | undefined;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
