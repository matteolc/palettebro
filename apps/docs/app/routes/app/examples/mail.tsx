import { accounts, mails } from '~/components/examples/mail/data';
import { MailComponent } from '~/components/examples/mail/mail';
import { Card } from '@palettebro/shadcn-ui/card';

export default function Page() {
  return (
    <Card className="shadow rounded-lg">
      <div className="hidden flex-col md:flex">
        <MailComponent
          accounts={accounts}
          mails={mails}
          defaultLayout={undefined}
          defaultCollapsed={undefined}
          navCollapsedSize={4}
        />
      </div>
    </Card>
  );
}
