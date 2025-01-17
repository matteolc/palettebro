import {
  generateHuemints,
  parseHuemintsFormData,
} from '@palettebruh/theme-generator/services';
import type { LoaderFunctionArgs } from '@vercel/remix';

export async function action({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  return await generateHuemints(parseHuemintsFormData(formData));
}
