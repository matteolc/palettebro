// Tremor Radio Card [v0.0.3]

import * as RadioGroupPrimitives from '@radix-ui/react-radio-group';
import clsx from 'clsx';
import React from 'react';

const RadioCardGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root>
>(({ className, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Root
      ref={forwardedRef}
      className={clsx('grid gap-2', className)}
      {...props}
    />
  );
});

RadioCardGroup.displayName = 'RadioCardGroup';

const RadioCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>
>(({ className, children, ...props }, forwardedRef) => {
  return (
    <RadioGroupPrimitives.Item
      ref={forwardedRef}
      className={clsx(
        // base
        'group relative w-full rounded-md border p-4 text-left shadow-sm transition focus:outline-none',
        // background color
        'bg-white',
        // border color
        'border-neutral-300',
        'data-[state=checked]:border-neutral-200',
        // disabled
        'data-[disabled]:border-gray-100',
        'data-[disabled]:bg-gray-50 data-[disabled]:shadow-none',
        // focusInput,
        className,
      )}
      {...props}
    >
      {children}
    </RadioGroupPrimitives.Item>
  );
});

RadioCardItem.displayName = 'RadioCardItem';

const RadioCardIndicator = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitives.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Indicator>
>(({ className, ...props }, forwardedRef) => {
  return (
    <div
      className={clsx(
        // base
        'relative flex size-4 shrink-0 appearance-none items-center justify-center rounded-full border shadow-sm outline-none',
        // border color
        'border-gray-300',
        // background color
        'bg-white',
        // checked
        'group-data-[state=checked]:border-0 group-data-[state=checked]:border-transparent group-data-[state=checked]:bg-zinc-800',
        // disabled
        'group-data-[disabled]:border-gray-300 group-data-[disabled]:bg-gray-100 group-data-[disabled]:text-gray-400',
        // focus
        // focusRing,
        className,
      )}
    >
      <RadioGroupPrimitives.Indicator
        ref={forwardedRef}
        className={clsx('flex items-center justify-center')}
        {...props}
      >
        <div
          className={clsx(
            // base
            'size size-1.5 shrink-0 rounded-full',
            // indicator
            'bg-white',
            // disabled
            'group-data-[disabled]:bg-gray-400',
          )}
        />
      </RadioGroupPrimitives.Indicator>
    </div>
  );
});

RadioCardIndicator.displayName = 'RadioCardIndicator';

export { RadioCardGroup, RadioCardIndicator, RadioCardItem };
