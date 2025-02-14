import {
  generateHuemints,
  generateKobayashi,
  parseKobayashiFormData,
  parseHuemintsFormData,
} from '@palettebro/theme-generator/server';
import { ThemeVariantEnum } from '@palettebro/theme-generator';
import type { ThemeVariant } from '@palettebro/theme-generator';
import type { Route } from './+types/generate';

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const variant = formData.get('mode') as ThemeVariant;

  switch (variant) {
    case ThemeVariantEnum.dynamic: {
      const { results } = await generateHuemints(
        parseHuemintsFormData(formData),
      );
      return { results };
    }
    case ThemeVariantEnum.kobayashi: {
      const { results } = await generateKobayashi(
        parseKobayashiFormData(formData),
      );
      return { results };
    }
  }
}
