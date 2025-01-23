import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { generateMeta } from '~/utils/meta-utils';
import type { MetaFunction } from '@vercel/remix';
import { DownloadDialog } from '~/components/DownloadDialog';
import { ThemePalette } from '@palettebro/theme-toolbar';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: 'Color Palette',
    description:
      'Explore our comprehensive color palette system with detailed shades and color variations. View contrast ratios and accessibility grades for each color.',
  });
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Color Palette Reference</PageHeaderHeading>
        <PageHeaderDescription>
          A complete reference of all color tokens and their shades offered by
          Palettebro. Click on a color token to view{' '}
          <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a> and{' '}
          <a href="https://www.w3.org/TR/WCAG3/">WCAG 3.0</a> accessibility
          ratings.
        </PageHeaderDescription>
        <PageActions>
          <DownloadDialog />
        </PageActions>
      </PageHeader>

      <div className="container mt-8">
        <ThemePalette />
      </div>
    </>
  );
}
