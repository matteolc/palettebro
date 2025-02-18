import { Outlet } from 'react-router';
import { SidebarNav } from '~/components/examples/forms/components/sidebar-nav';
import { Card } from '@palettebro/shadcn-ui/card';
import { Separator } from '@palettebro/shadcn-ui/separator';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/examples/forms',
  },
  {
    title: 'Account',
    href: '/examples/forms/account',
  },
  {
    title: 'Appearance',
    href: '/examples/forms/appearance',
  },
  {
    title: 'Notifications',
    href: '/examples/forms/notifications',
  },
  {
    title: 'Display',
    href: '/examples/forms/display',
  },
];

export default function Page() {
  return (
    <Card className="shadow rounded-lg">
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:gap-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </Card>
  );
}
