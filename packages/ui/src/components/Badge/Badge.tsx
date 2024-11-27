/**
 * Badges are used for showing a small amount of color-categorized metadata, ideal for getting a user's attention.
 */
import React from 'react';
import { type VariantProps, tv } from 'tailwind-variants';

import { cx } from '../../cx';
import type { IComponentBaseProps } from '../../types';

const badgeVariants = tv({
  variants: {
    brand: {
      default:
        'inline-flex items-center gap-x-1 rounded-md px-2 py-0.5 text-sm/5 font-medium sm:text-xs/5 whitespace-nowrap',
    },
    color: {
      red: [
        'bg-red-500/15 text-red-700 ring-red-500/30 group-data-[hover]:bg-red-500/25',
        'dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/30 dark:group-data-[hover]:bg-red-500/20',
      ],
      orange: [
        'bg-orange-500/15 text-orange-700 ring-orange-500/30 group-data-[hover]:bg-orange-500/25',
        'dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-400/30 dark:group-data-[hover]:bg-orange-500/20',
      ],
      amber: [
        'bg-amber-400/20 text-amber-700 ring-amber-400/30 group-data-[hover]:bg-amber-400/30',
        'dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30 dark:group-data-[hover]:bg-amber-400/15',
      ],
      yellow: [
        'bg-yellow-400/20 text-yellow-700 ring-yellow-400/30 group-data-[hover]:bg-yellow-400/30',
        'dark:bg-yellow-400/10 dark:text-yellow-300 dark:ring-yellow-400/30 dark:group-data-[hover]:bg-yellow-400/15',
      ],
      lime: [
        'bg-lime-400/20 text-lime-700 ring-lime-400/30 group-data-[hover]:bg-lime-400/30',
        'dark:bg-lime-400/10 dark:text-lime-300 dark:ring-lime-400/30 dark:group-data-[hover]:bg-lime-400/15',
      ],
      green: [
        'bg-green-500/15 text-green-700 ring-green-500/30 group-data-[hover]:bg-green-500/25',
        'dark:bg-green-500/10 dark:text-green-400 dark:ring-green-400/30 dark:group-data-[hover]:bg-green-500/20',
      ],
      emerald: [
        'bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 group-data-[hover]:bg-emerald-500/25',
        'dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/30 dark:group-data-[hover]:bg-emerald-500/20',
      ],
      teal: [
        'bg-teal-500/15 text-teal-700 ring-teal-500/30 group-data-[hover]:bg-teal-500/25',
        'dark:bg-teal-500/10 dark:text-teal-300 dark:ring-teal-400/30 dark:group-data-[hover]:bg-teal-500/20',
      ],
      cyan: [
        'bg-cyan-400/20 text-cyan-700 ring-cyan-400/30 group-data-[hover]:bg-cyan-400/30',
        'dark:bg-cyan-400/10 dark:text-cyan-300 dark:ring-cyan-400/30 dark:group-data-[hover]:bg-cyan-400/15',
      ],
      sky: [
        'bg-sky-500/15 text-sky-700 ring-sky-500/30 group-data-[hover]:bg-sky-500/25',
        'dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/30 dark:group-data-[hover]:bg-sky-500/20',
      ],
      blue: [
        'bg-blue-500/15 text-blue-700 ring-blue-500/30 group-data-[hover]:bg-blue-500/25',
        'dark:text-blue-400 dark:ring-blue-400/30 dark:group-data-[hover]:bg-blue-500/25',
      ],
      indigo: [
        'bg-indigo-500/15 text-indigo-700 ring-indigo-500/30 group-data-[hover]:bg-indigo-500/25',
        'dark:text-indigo-400 dark:ring-indigo-400/30 dark:group-data-[hover]:bg-indigo-500/20',
      ],
      violet: [
        'bg-violet-500/15 text-violet-700 ring-violet-500/30 group-data-[hover]:bg-violet-500/25',
        'dark:text-violet-400 dark:ring-violet-400/30 dark:group-data-[hover]:bg-violet-500/20',
      ],
      purple: [
        'bg-purple-500/15 text-purple-700 ring-purple-500/30 group-data-[hover]:bg-purple-500/25',
        'dark:text-purple-400 dark:ring-purple-400/30 dark:group-data-[hover]:bg-purple-500/20',
      ],
      fuchsia: [
        'bg-fuchsia-400/15 text-fuchsia-700 ring-fuchsia-400/30 group-data-[hover]:bg-fuchsia-400/25',
        'dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:ring-fuchsia-400/30 dark:group-data-[hover]:bg-fuchsia-400/20',
      ],
      pink: [
        'bg-pink-400/15 text-pink-700 ring-pink-400/30 group-data-[hover]:bg-pink-400/25',
        'dark:bg-pink-400/10 dark:text-pink-400 dark:ring-pink-400/30 dark:group-data-[hover]:bg-pink-400/20',
      ],
      rose: [
        'bg-rose-400/15 text-rose-700 ring-rose-400/30 group-data-[hover]:bg-rose-400/25',
        'dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/30 dark:group-data-[hover]:bg-rose-400/20',
      ],
      zinc: [
        'bg-zinc-600/10 text-zinc-700 ring-zinc-600/30 group-data-[hover]:bg-zinc-600/20',
        'dark:bg-white/5 dark:text-zinc-400 dark:ring-zinc-400/30 dark:group-data-[hover]:bg-white/10',
      ],
    },
    outline: {
      true: 'ring-1 ring-inset forced-colors:outline ring-base-200',
    },
    variant: {
      info: [
        'bg-info-400/15 text-info-700 ring-info-600/30 group-data-[hover]:bg-info-600/20',
        'dark:bg-info-400/10 dark:text-info-400 dark:ring-info-400/30 dark:group-data-[hover]:bg-info-400/20',
      ],
      primary: [
        'bg-primary-400/15 text-primary-700 ring-primary-600/30 group-data-[hover]:bg-primary-600/20',
        'dark:bg-primary-400/10 dark:text-primary-400 dark:ring-primary-400/30 dark:group-data-[hover]:bg-primary-400/20',
      ],
      secondary: [
        'bg-secondary-400/15 text-secondary-700 ring-secondary-600/30 group-data-[hover]:bg-secondary-600/20',
        'dark:bg-secondary-400/10 dark:text-secondary-400 dark:ring-secondary-400/30 dark:group-data-[hover]:bg-secondary-400/20',
      ],
      accent: [
        'bg-accent-400/15 text-accent-700 ring-accent-600/30 group-data-[hover]:bg-accent-600/20',
        'dark:bg-accent-400/10 dark:text-accent-400 dark:ring-accent-400/30 dark:group-data-[hover]:bg-accent-400/20',
      ],
      success: [
        'bg-success-400/15 text-success-700 ring-success-600/30 group-data-[hover]:bg-success-600/20',
        'dark:bg-success-400/10 dark:text-success-400 dark:ring-success-400/30 dark:group-data-[hover]:bg-success-400/20',
      ],
      error: [
        'bg-error-400/15 text-error-700 ring-error-600/30 group-data-[hover]:bg-error-600/20',
        'dark:bg-error-400/10 dark:text-error-400 dark:ring-error-400/30 dark:group-data-[hover]:bg-error-400/20',
      ],
      warning: [
        'bg-warning-400/15 text-warning-700 ring-warning-600/30 group-data-[hover]:bg-warning-600/20',
        'dark:bg-warning-400/10 dark:text-warning-400 dark:ring-warning-400/30 dark:group-data-[hover]:bg-warning-400/20',
      ],
    },
  },
  defaultVariants: {
    brand: 'default',
  },
});

type BadgeProps = React.ComponentPropsWithoutRef<'span'> &
  IComponentBaseProps & VariantProps<typeof badgeVariants>

const Badge = React.memo(
  React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
      {
        dataTheme,
        className,
        brand,
        variant,
        color,
        outline,
        ...props
      }: BadgeProps,
      forwardedRef,
    ) => {
      return (
        <span
          ref={forwardedRef}
          className={cx(
            badgeVariants({ brand, variant, outline, color }),
            className,
          )}
          role="presentation"
          data-theme={dataTheme}
          data-testid="ui/badge"
          {...props}
        />
      );
    },
  ),
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants, type BadgeProps };
