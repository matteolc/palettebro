import type { Wcag2Grade } from './types';

enum Wcag2Level {
  aaa = 7,
  aa = 4.5,
  aa18 = 3,
  ko = 0,
}

enum Wcag3Level {
  all = 75,
  body = 60,
  large = 45,
  text = 30,
  nonText = 15,
  ko = 0,
}

const wcag2To3Equivalences = {
  [Wcag2Level.aaa]: Wcag3Level.all,
  [Wcag2Level.aa]: Wcag3Level.body,
  [Wcag2Level.aa18]: Wcag3Level.large,
  [Wcag2Level.ko]: Wcag3Level.ko,
};

const wcag3To2Equivalences = {
  [Wcag3Level.all]: Wcag2Level.aaa,
  [Wcag3Level.body]: Wcag2Level.aa,
  [Wcag3Level.large]: Wcag2Level.aa18,
  [Wcag3Level.text]: Wcag2Level.aa18,
  [Wcag3Level.nonText]: Wcag2Level.ko,
  [Wcag3Level.ko]: Wcag2Level.ko,
};

const CONTRAST_GRADES: Record<string, Wcag2Grade> = {
  [Wcag2Level.aaa]: 'AAA',
  [Wcag2Level.aa]: 'AA',
  [Wcag2Level.aa18]: 'AA18',
} as const;

export {
  Wcag2Level,
  Wcag3Level,
  wcag2To3Equivalences,
  wcag3To2Equivalences,
  CONTRAST_GRADES,
};
