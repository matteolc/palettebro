import { Link, Outlet } from 'react-router';
import type { MetaFunction } from 'react-router';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { BlocksNav } from '~/components/blocks/blocks-nav';
import { Button } from '@palettebro/shadcn-ui/button';
import { generateMeta } from '~/utils/meta-utils';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: 'UI Blocks',
    description:
      'Preview and test your color palettes with our collection of UI blocks and components. See how your colors work in real-world scenarios.',
  });
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
        <PageHeaderDescription>
          Clean, modern building blocks built with{' '}
          <a href="https://ui.shadcn.com">shadcn/ui</a> and styled with{' '}
          <a href="/">Palettebruh</a>.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <Link to="/examples">Browse Examples</Link>
          </Button>
        </PageActions>
      </PageHeader>
      <div id="blocks" className="border-grid scroll-mt-24 border-b">
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            <BlocksNav />
          </div>
        </div>
      </div>
      <div className="container flex-1">
        <Outlet />
      </div>
    </>
  );
}
