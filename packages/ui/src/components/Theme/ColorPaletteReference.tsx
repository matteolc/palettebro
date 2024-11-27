import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import dlv from 'dlv';
import { useEffect, useState } from 'react';
import colorPalette from 'tailwindcss/colors';
import { sentenceCase } from './utils';
import { nearestColor } from '@repo/theme-generator';

function kebabToTitleCase(str: string) {
  return str
    .replace(/(?:^|-)([a-z])/gi, (m, p1) => ` ${p1.toUpperCase()}`)
    .trim();
}

export function ColorPaletteReference({
  colors,
}: { colors: (string | [string, string])[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1">
      {colors.map((color) => {
        const title = Array.isArray(color) ? color[0] : kebabToTitleCase(color);
        const value = Array.isArray(color) ? color[1] : color;

        const palette =
          typeof value === 'string'
            ? [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (variant) => ({
                name: variant,
                value: dlv(colorPalette, [value, variant]),
              }),
            )
            : Object.keys(value).map((name) => ({ name, value: value[name] }));

        return (
          <div key={title} className="2xl:contents">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-200 2xl:col-end-1 2xl:pt-2.5">
              {title
                .split('')
                .flatMap((l: string, i: number) => {
                  return i !== 0 && l.toUpperCase() === l ? [' ', l] : [l];
                })
                .join('')}
            </div>
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-3 gap-x-2 sm:mt-2 2xl:mt-0">
              {palette.map((props) => (
                <ColorPalette key={props.name} {...props} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const hints = {
  "neutral-100": "Default background",
  "neutral-200": "Secondary background, decorative border.",
  "neutral-300": "Decorative border",
  "neutral-400": "Field border",
  "neutral-600": "Disabled text",
  "neutral-700": "Control border (switch, checkbox, radio)",
  "neutral-800": "Secondary text",
  "neutral-900": "Text",
  "neutral-950": "Heading",
  ...Object.fromEntries(
    ["accent", "success", "warning", "error", "info", "primary", "secondary"].flatMap((palette) => [
      [`${palette}-100`, "Muted background"],
      [`${palette}-500`, "Component background (default), Text"],
      [`${palette}-600`, "Component background (hover)"],
      [`${palette}-700`, "Component background (active)"],
    ])
  ),
};

export const CustomColorPaletteContainer = ({ colors }: { colors: string[] }) => {
  return (
    <div className="grid grid-cols-3 gap-x-2 mb-20">
      {colors.map((color) => {
        return (
          <div key={color} className="relative rounded-md sm:w-full ring-1 ring-inset ring-neutral-800/10">
            <div
              className={clsx("h-20 rounded-t-[inherit] border-b border-[0.5px] border-neutral-800/10 p-2 leading-tight text-xs")}
              style={{ backgroundColor: color }}
            >
              <span>{nearestColor(color)}</span>
            </div>
            <div className="px-2 text-sm text-neutral min-w-24">
              <p>{color}</p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export const ColorPaletteContainer = ({ palette, colors }: { palette: Record<string, { name: string; color: string }>; colors: string[] }) => {
  const colorMap = colors.reduce((acc, color) => {
    acc[color] = sentenceCase(color);
    return acc;
  }, {} as Record<string, string>);
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-2 gap-y-8 sm:grid-cols-1 space-y-20 mb-20">
      {colors.map((color) => {
        return (
          <div key={color} className="2xl:contents">
            <div className="font-semibold text-neutral-800 text-xl 2xl:col-end-1 2xl:pt-2.5">
              {colorMap[color]}
            </div>
            <div className="grid mt-3 grid-cols-1 sm:grid-cols-11 gap-y-8 gap-x-2 sm:mt-2 2xl:mt-0">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((variant) => {
                const hint: string | undefined = hints[`${color}-${variant}` as keyof typeof hints];
                const textVariant = variant > 400 ? 50 : 950;
                return (
                  <div key={color} className="relative rounded-md sm:w-full ring-1 ring-inset ring-neutral-800/10">
                    <div
                      className={clsx("h-20 rounded-t-[inherit] border-b border-[0.5px] border-neutral-800/10 p-2 leading-tight text-xs")}
                      style={{ backgroundColor: `oklch(var(--${color}-${variant}))`, color: `oklch(var(--${color}-${textVariant}))` }}
                    >
                      <span>{palette[`${color}-${variant}`]?.name}</span>
                    </div>
                    <div className="px-2 text-sm text-neutral min-w-24">
                      <p>{variant}</p>
                    </div>
                    {hint && (
                      <div className="absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-full flex-col items-center justify-center p-2">
                        <div className="h-3 w-px bg-neutral" />
                        <p className="w-full text-center text-xs text-neutral">{hint}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  )
}

export function ColorPalette({
  name,
  color,
  value,
  className,
}: { name: number | string; color?: string; value?: string; className?: string }) {
  const [{ state }, setState] = useState({ state: 'idle' });

  useEffect(() => {
    if (state === 'copied') {
      const handle = window.setTimeout(() => {
        setState({ state: 'idle' });
      }, 1500);
      return () => {
        window.clearTimeout(handle);
      };
    }
  }, [state]);

  return (
    <div className="relative flex">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: TODO: fix */}
      <div
        className="flex items-center gap-x-3 w-full cursor-pointer sm:block sm:space-y-1.5"
        onClick={() =>
          navigator.clipboard.writeText(value ?? '').then(() => {
            setState({ state: 'copied' });
          })
        }
      >
        <div
          className={clsx(
            'h-10 w-10 rounded dark:ring-1 dark:ring-inset dark:ring-white/10 sm:w-full',
            className,
          )}
          style={{ backgroundColor: value }}
        />
        <div className="px-0.5">
          <div className="w-6 font-medium text-xs text-slate-900 2xl:w-full dark:text-white">
            {name}
          </div>
          <div className="text-slate-500 text-xs font-mono lowercase dark:text-slate-400 sm:text-[0.625rem] md:text-xs lg:text-[0.625rem] 2xl:text-xs">
            {color}
          </div>
        </div>
      </div>
      <Transition
        show={state === 'copied'}
        enter="transform ease-out duration-200 transition origin-bottom"
        enterFrom="scale-95 translate-y-0.5 opacity-0"
        enterTo="scale-100 translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute bottom-full left-1/2 mb-3.5 pb-1 -translate-x-1/2">
          <div className="relative bg-sky-500 text-white font-mono text-[0.625rem] leading-6 font-medium px-1.5 rounded-lg">
            Copied
            <svg
              aria-hidden="true"
              width="16"
              height="6"
              viewBox="0 0 16 6"
              className="text-sky-500 absolute top-full left-1/2 -mt-px -ml-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Transition>
    </div>
  );
}
