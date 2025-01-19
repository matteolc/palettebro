import { NavLink, Outlet } from '@remix-run/react';
import type { MetaFunction } from '@vercel/remix';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { ExamplesNav } from '~/components/examples/examples-nav';
import { Button } from '~/components/ui/button';
import { generateMeta } from '~/utils/meta-utils';

export const meta: MetaFunction = () => {
  return generateMeta({
    title: 'Examples',
    description:
      'Explore real-world examples of color palettes in action. See how different color combinations work with various UI components and layouts.',
  });
};

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Example component library</PageHeaderHeading>
        <PageHeaderDescription>
          A collection of components made with{' '}
          <a href="https://ui.shadcn.com">shadcn/ui</a> themed with{' '}
          <a href="https://ui.shadcn.com/docs/theming#css-variables">
            CSS variables
          </a>
          .
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <NavLink to="/docs">Get Started</NavLink>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <NavLink to="/blocks">Browse Blocks</NavLink>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="border-grid border-b">
        <div className="container py-4">
          <ExamplesNav />
        </div>
      </div>
      <div className="py-8 container">
        <Outlet />
      </div>
    </>
  );
}
