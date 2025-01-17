import * as SliderPrimitive from '@radix-ui/react-slider';
import clsx from 'clsx';
import * as React from 'react';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  ariaLabelThumb?: string;
  trackStyle?: React.CSSProperties;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, trackStyle, ariaLabelThumb, ...props }, forwardedRef) => {
  return (
    <SliderPrimitive.Root
      ref={forwardedRef}
      className={clsx(
        'relative flex cursor-pointer touch-none select-none',
        "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
        "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
        'data-[disabled]:pointer-events-none',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={clsx(
          'relative grow overflow-hidden rounded-full bg-gradient-to-r',
          "data-[orientation='horizontal']:h-4 data-[orientation='horizontal']:w-full",
          "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-4",
        )}
        style={trackStyle}
      >
        <SliderPrimitive.Range
          className={clsx(
            'absolute rounded-full bg-transparent',
            "data-[orientation='horizontal']:h-full",
            "data-[orientation='vertical']:w-full",
            'data-[disabled]:bg-muted',
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={clsx(
          'block size-6 shrink-0 rounded-full border-2 shadow transition-all',
          'border-zinc-800',
          'bg-white',
          'data-[disabled]:pointer-events-none data-[disabled]:bg-gray-200',
          'outline-offset-0',
        )}
        aria-label={ariaLabelThumb}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
