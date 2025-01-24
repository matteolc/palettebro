import {
  modeP3,
  modeRec2020,
  modeOklch,
  modeOklab,
  modeXyz65,
  modeRgb,
  modeLch,
  modeHsl,
  modeLab,
  modeLrgb,
  useMode as setCuloriMode,
} from 'culori/fn';

export const rec2020 = setCuloriMode(modeRec2020);
export const oklch = setCuloriMode(modeOklch);
export const oklab = setCuloriMode(modeOklab);
export const xyz65 = setCuloriMode(modeXyz65);
export const rgb = setCuloriMode(modeRgb);
export const lch = setCuloriMode(modeLch);
export const hsl = setCuloriMode(modeHsl);
export const lab = setCuloriMode(modeLab);
export const lrgb = setCuloriMode(modeLrgb);
export const p3 = setCuloriMode(modeP3);
