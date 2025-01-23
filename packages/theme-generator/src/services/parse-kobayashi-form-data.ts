import type { GenerateKobayashiParams } from './generate-kobayashi';

export function parseKobayashiFormData(
  formData: FormData,
): GenerateKobayashiParams {
  const image =
    (formData.get('image') as GenerateKobayashiParams['image']) || 'pretty';
  const word = (formData.get('word') as string) || 'pretty';

  return {
    image,
    word,
  };
}
