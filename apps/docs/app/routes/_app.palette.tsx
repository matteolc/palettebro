import { NavLink } from '@remix-run/react';
import { BASE_TOKENS, STATUS_TOKENS } from '@palettebruh/theme-toolbar';
import { TokenColorPalette } from '@palettebruh/theme-toolbar';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { Button } from '~/components/ui/button';
import { generateMeta } from '~/utils/meta-utils';
import type { MetaFunction } from '@vercel/remix';
import { DownloadDialog } from '~/components/DownloadDialog';

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
          A complete reference of all color tokens and their shades offered by Palettebruh. Colors include{' '}
          <a href="https://www.w3.org/TR/WCAG22/">WCAG 2.2</a> and{' '}
          <a href="https://www.w3.org/TR/WCAG3/">WCAG 3.0</a> accessibility ratings.
        </PageHeaderDescription>
        <PageActions>
          <DownloadDialog />
        </PageActions>
      </PageHeader>

      <div className="container mt-8 flex flex-col gap-y-4">
        {[...BASE_TOKENS, ...STATUS_TOKENS].map((token) => (
          <TokenColorPalette token={token} key={token} />
        ))}
      </div>
    </>
  );
}
