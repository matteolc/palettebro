import { NotificationsForm } from '~/components/examples/forms/notifications/notifications-form';
import { Separator } from '@palettebro/shadcn-ui/separator';

export default function Page() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Configure how you receive notifications.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  );
}
