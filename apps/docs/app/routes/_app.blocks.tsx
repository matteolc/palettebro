import { Outlet } from '@remix-run/react';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { BlocksNav } from '~/components/blocks/blocks-nav';
import { Button } from '~/components/ui/button';

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Building Blocks for the Web</PageHeaderHeading>
        <PageHeaderDescription>
          Clean, modern building blocks built with <a href="https://ui.shadcn.com">shadcn/ui</a> and styled with{' '}
          <a href="/">Palettebruh</a>.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <a href="#blocks">Browse Blocks</a>
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
