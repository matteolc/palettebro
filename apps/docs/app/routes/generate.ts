import {
  generateHuemints,
  generateKobayashi,
  parseKobayashiFormData,
  parseHuemintsFormData,
} from '@palettebro/theme-generator/server';
import { ThemeVariantEnum } from '@palettebro/theme-generator';
import type { ThemeVariant } from '@palettebro/theme-generator';
import type { LoaderFunctionArgs } from '@vercel/remix';

export async function action({ request }: LoaderFunctionArgs) {
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
