import { formatDistanceToNow } from 'date-fns';
import type { ComponentProps } from 'react';

import { Badge } from '@palettebro/shadcn-ui/badge';
import { ScrollArea } from '@palettebro/shadcn-ui/scroll-area';
import { cn } from '~/lib/utils';
import type { Mail } from './data';
import { useMail } from './use-mail';

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            className={cn(
              'group flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent hover:text-accent-foreground',
              mail.selected === item.id && 'bg-muted',
            )}
            onClick={() =>
              setMail({
                ...mail,
                selected: item.id,
              })
            }
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex h-2 w-2 rounded-full bg-chart-2" />
                  )}
                </div>
                <div
                  className={cn(
                    'ml-auto text-xs',
                    mail.selected === item.id
                      ? 'text-foreground'
                      : 'text-muted-foreground group-hover:text-accent-foreground',
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground group-hover:text-accent-foreground">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length ? (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge key={label} variant={getBadgeVariantFromLabel(label)} className="group-hover:text-accent-foreground">
                    {label}
                  </Badge>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>['variant'] {
  if (['work'].includes(label.toLowerCase())) {
    return 'default';
  }

  if (['personal'].includes(label.toLowerCase())) {
    return 'outline';
  }

  return 'secondary';
}
