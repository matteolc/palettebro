import type { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  rightElement?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const SettingsSection = ({
  title,
  rightElement,
  children,
  className = 'mb-4',
}: SettingsSectionProps) => {
  return (
    <div className={className}>
      <div className="flex flex-row items-center justify-between text-zinc-950">
        <div className="text-md mb-2 font-bold">{title}</div>
        {rightElement}
      </div>
      {children}
    </div>
  );
};
