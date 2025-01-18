import { cn } from '@/lib/cn';
import { RiCheckLine, RiClipboardLine } from '@remixicon/react';
import { useState } from 'react';

export function PaletteSwatch({
  color,
  className,
}: {
  color: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      className={cn(
        'isolate group relative h-10 w-10 rounded-md transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2',
        className,
      )}
      style={{ backgroundColor: color }}
    >
      <span className="sr-only">Copy color: {color}</span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
        {copied ? (
          <RiCheckLine className="h-4 w-4 text-white drop-shadow-md" />
        ) : (
          <RiClipboardLine className="h-4 w-4 text-white drop-shadow-md" />
        )}
      </div>
      <div className="absolute -bottom-8 left-1/2 hidden -translate-x-1/2 rounded bg-popover px-2 py-1 text-xs group-hover:block">
        {color}
      </div>
    </button>
  );
}
