import { NavLink } from '@remix-run/react';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { ExamplesNav } from '~/components/examples/examples-nav';
import { CardsActivityGoal } from '~/components/shadcn/CardsActivityGoal';
import { CardsAlert } from '~/components/shadcn/CardsAlert';
import { CardsAreaChart } from '~/components/shadcn/CardsAreaChart';
import { CardsAreaChartIteractive } from '~/components/shadcn/CardsAreaChartInteractive';
import { CardsCalendar } from '~/components/shadcn/CardsCalendar';
import { CardsChat } from '~/components/shadcn/CardsChat';
import { CardsCookieSettings } from '~/components/shadcn/CardsCookieSettings';
import { CardsCreateAccount } from '~/components/shadcn/CardsCreateAccount';
import { CardsDataTable } from '~/components/shadcn/CardsDataTable';
import { CardsMetric } from '~/components/shadcn/CardsMetric';
import { CardsNotifications } from '~/components/shadcn/CardsNotifications';
import { CardsPaymentMethod } from '~/components/shadcn/CardsPaymentMethod';
import { CardsProduct } from '~/components/shadcn/CardsProduct';
import { CardsProductOutOfStock } from '~/components/shadcn/CardsProductOutOfStock';
import { CardsReportIssue } from '~/components/shadcn/CardsReportIssue';
import { CardsShare } from '~/components/shadcn/CardsShare';
import { CardsStats } from '~/components/shadcn/CardsStats';
import { CardsTeamMembers } from '~/components/shadcn/CardsTeamMembers';
import { CardsTrendingChart } from '~/components/shadcn/CardsTrendingChart';
import { CardsTrendingStackedChart } from '~/components/shadcn/CardsTrendingStackedChart';
import { Button } from '~/components/ui/button';

export default function Page() {
  return (
    <section className="overflow-hidden">
      <div className="md:grids-col-2 grid md:gap-4 lg:grid-cols-10 xl:grid-cols-11 xl:gap-4">
        <div className="space-y-4 lg:col-span-4 xl:col-span-6 xl:space-y-4">
          <CardsStats />
          <div className="grid gap-1 sm:grid-cols-[260px_1fr] md:hidden">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-4">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-4">
              <CardsMetric />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="space-y-4 xl:space-y-4">
              <CardsTeamMembers />
              <CardsCookieSettings />
              <CardsPaymentMethod />
            </div>
            <div className="space-y-4 xl:space-y-4">
              <CardsChat />
              <CardsCreateAccount />
              <div className="hidden xl:block">
                <CardsReportIssue />
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-6 xl:col-span-5 xl:space-y-4">
          <div className="hidden gap-1 sm:grid-cols-[260px_1fr] md:grid">
            <CardsCalendar />
            <div className="pt-3 sm:pl-2 sm:pt-0 xl:pl-3">
              <CardsActivityGoal />
            </div>
            <div className="pt-3 sm:col-span-2 xl:pt-3">
              <CardsMetric />
            </div>
          </div>
          <div className="hidden md:block">
            <CardsDataTable />
          </div>
          <CardsShare />
          <div className="xl:hidden">
            <CardsReportIssue />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-10 xl:col-span-11 xl:space-y-4">
          <CardsAlert />
        </div>
        <div className="space-y-4 lg:col-span-10 xl:col-span-11 xl:space-y-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <CardsTrendingChart />
            <CardsTrendingStackedChart />
            <CardsAreaChart />
          </div>
          <CardsAreaChartIteractive />
        </div>

        <div className="space-y-4 lg:col-span-10 xl:col-span-11 xl:space-y-4">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <CardsNotifications />
            <CardsProduct />
            <CardsProductOutOfStock
              name="Wireless Headphones"
              price={129.99}
              category="Out of stock"
              rating={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
