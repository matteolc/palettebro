import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import clsx from "clsx"

interface SliderProps
    extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
    ariaLabelThumb?: string
    trackStyle?: React.CSSProperties
}

const Slider = React.forwardRef<
    React.ElementRef<typeof SliderPrimitive.Root>,
    SliderProps
>(({ className, trackStyle, ariaLabelThumb, ...props }, forwardedRef) => {
    const value = props.value || props.defaultValue
    return (
        <SliderPrimitive.Root
            ref={forwardedRef}
            className={clsx(
                // base
                "relative flex cursor-pointer touch-none select-none",
                // orientation
                "data-[orientation='horizontal']:w-full data-[orientation='horizontal']:items-center",
                "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-fit data-[orientation='vertical']:justify-center",
                // disabled
                "data-[disabled]:pointer-events-none",
                className,
            )}
            {...props}
        >
            <SliderPrimitive.Track
                className={clsx(
                    // base
                    "relative grow overflow-hidden rounded-full bg-gradient-to-r border border-zinc-200",
                    // orientation
                    "data-[orientation='horizontal']:h-4 data-[orientation='horizontal']:w-full",
                    "data-[orientation='vertical']:h-full data-[orientation='vertical']:w-4",
                )}
                style={trackStyle}
            >
                <SliderPrimitive.Range
                    className={clsx(
                        // base
                        "absolute rounded-full bg-transparent",
                        // orientation
                        "data-[orientation='horizontal']:h-full",
                        "data-[orientation='vertical']:w-full",
                        // disabled
                        "data-[disabled]:bg-muted",
                    )}
                />
            </SliderPrimitive.Track>
            {value?.map((_, index) => (
                <SliderPrimitive.Thumb
                    key={index}
                    className={clsx(
                        // base
                        "block size-6 shrink-0 rounded-full border-2 shadow transition-all",
                        // boder color
                        "border-primary",
                        // background color
                        "bg-white",
                        // disabled
                        "data-[disabled]:pointer-events-none data-[disabled]:bg-gray-200",
                        "outline-offset-0",
                    )}
                    aria-label={ariaLabelThumb}
                />
            ))}
        </SliderPrimitive.Root>
    )
})

Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }