import {
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { NavLink } from 'react-router';
import { PageActions } from '~/components/PageHeader';
import { Outlet } from 'react-router';
import { PageHeader } from '~/components/PageHeader';
import { Button } from '~/components/ui/button';

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Docs</PageHeaderHeading>
        <PageHeaderDescription>
          Under construction.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <NavLink to="/palette">See Palette</NavLink>
          </Button>
        </PageActions>
      </PageHeader>
      <div className="border-grid border-b">
        <div className="container py-4"/>
      </div>
      <div className="py-8 container">
        <Outlet />
      </div>
    </>
  );
}
