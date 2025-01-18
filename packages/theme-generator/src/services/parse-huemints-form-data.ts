import type { GenerativeThemePreset } from '../types';
import type { GenerateHuemintsParams } from './generate-huemints';

export function parseHuemintsFormData(
  formData: FormData,
): GenerateHuemintsParams {
  const mode =
    (formData.get('mode') as GenerateHuemintsParams['mode']) || 'transformer';
  const colors = Number(formData.get('colors')) || 3;
  const temperature = Number(formData.get('temperature')) || 1.2;
  const page =
    (formData.get('page') as GenerateHuemintsParams['page']) || 'brand-2';
  const preset = (formData.get('preset') as string) || 'default';
  const adjacency = (formData.get('adjacency') as string)?.split(',') || [];

  const palette = Array<string>(colors).fill('-');
  const tokens = ['primary', 'secondary', 'accent'];

  for (const token of tokens) {
    const value = formData.get(token);
    if (value) {
      palette[tokens.indexOf(token)] = value as string;
    }
  }

  return {
    mode,
    colors,
    temperature,
    page,
    preset: preset as GenerativeThemePreset,
    adjacency,
    palette,
  };
}
