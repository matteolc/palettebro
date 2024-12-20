import { accounts, mails } from '~/components/examples/mail/data';
import { Mail } from '~/components/examples/mail/mail';
import { Card } from '~/components/ui/card';

export default function Page() {
  return (
    <Card className="shadow rounded-lg">
      <div className="hidden flex-col md:flex">
        <Mail
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
