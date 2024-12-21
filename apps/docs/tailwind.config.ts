import type { Config } from 'tailwindcss';

const config: Pick<
  Config,
  'presets' | 'content' | 'plugins' | 'darkMode' | 'theme' | 'variants'
> = {
  darkMode: ['class'],
  content: [
    './app/**/*.tsx',
    '../../packages/**/*.{js,ts,jsx,tsx}',
    '!../../packages/**/node_modules',
  ],
  plugins: [require('tailwindcss-animate')],
  variants: {
    extend: {
      first: ['first'],
      last: ['last'],
    },
  },
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'oklch(var(--primary-50)/<alpha-value>)',
        foreground: 'oklch(var(--neutral-700)/<alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--primary-50)/40)',
          foreground: 'oklch(var(--neutral-700))',
        },
        popover: {
          DEFAULT: 'oklch(var(--primary-50))',
          foreground: 'oklch(var(--neutral-700))',
        },
        muted: {
          DEFAULT: 'oklch(var(--neutral-200)/<alpha-value>)',
          foreground: 'oklch(var(--neutral-500)/<alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--error)/<alpha-value>)',
          foreground: 'oklch(var(--on-error)/<alpha-value>)',
        },
        border: 'oklch(var(--neutral-200)/<alpha-value>)',
        input: 'oklch(var(--neutral-200)/<alpha-value>)',
        ring: 'oklch(var(--neutral-100)/<alpha-value>)',
        chart: {
          '1': 'oklch(var(--primary-rainbow-1))',
          '2': 'oklch(var(--primary-rainbow-2))',
          '3': 'oklch(var(--primary-rainbow-3))',
          '4': 'oklch(var(--primary-rainbow-4))',
          '5': 'oklch(var(--primary-rainbow-5))',
        },
        sidebar: {
          DEFAULT: 'oklch(var(--primary-100))',
          foreground: 'oklch(var(--neutral-700))',
          primary: 'oklch(var(--primary))',
          'primary-foreground': 'oklch(var(--on-primary))',
          accent: 'oklch(var(--accent))',
          'accent-foreground': 'oklch(var(--on-accent))',
          border: 'oklch(var(--neutral-200))',
          ring: 'oklch(var(--neutral-100))',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary)/<alpha-value>)',
          foreground: 'oklch(var(--on-primary)/<alpha-value>)',
          50: 'var(--fallback-p,oklch(var(--primary-50)/<alpha-value>))',
          100: 'var(--fallback-p,oklch(var(--primary-100)/<alpha-value>))',
          200: 'var(--fallback-p,oklch(var(--primary-200)/<alpha-value>))',
          300: 'var(--fallback-p,oklch(var(--primary-300)/<alpha-value>))',
          400: 'var(--fallback-p,oklch(var(--primary-400)/<alpha-value>))',
          500: 'var(--fallback-p,oklch(var(--primary-500)/<alpha-value>))',
          600: 'var(--fallback-p,oklch(var(--primary-600)/<alpha-value>))',
          700: 'var(--fallback-p,oklch(var(--primary-700)/<alpha-value>))',
          800: 'var(--fallback-p,oklch(var(--primary-800)/<alpha-value>))',
          900: 'var(--fallback-p,oklch(var(--primary-900)/<alpha-value>))',
          950: 'var(--fallback-p,oklch(var(--primary-950)/<alpha-value>))',
        },
        'primary-content':
          'var(--fallback-pc,oklch(var(--on-primary)/<alpha-value>))',

        secondary: {
          DEFAULT: 'oklch(var(--secondary)/<alpha-value>)',
          foreground: 'oklch(var(--on-secondary)/<alpha-value>)',
          50: 'var(--fallback-s,oklch(var(--secondary-50)/<alpha-value>))',
          100: 'var(--fallback-s,oklch(var(--secondary-100)/<alpha-value>))',
          200: 'var(--fallback-s,oklch(var(--secondary-200)/<alpha-value>))',
          300: 'var(--fallback-s,oklch(var(--secondary-300)/<alpha-value>))',
          400: 'var(--fallback-s,oklch(var(--secondary-400)/<alpha-value>))',
          500: 'var(--fallback-s,oklch(var(--secondary-500)/<alpha-value>))',
          600: 'var(--fallback-s,oklch(var(--secondary-600)/<alpha-value>))',
          700: 'var(--fallback-s,oklch(var(--secondary-700)/<alpha-value>))',
          800: 'var(--fallback-s,oklch(var(--secondary-800)/<alpha-value>))',
          900: 'var(--fallback-s,oklch(var(--secondary-900)/<alpha-value>))',
          950: 'var(--fallback-s,oklch(var(--secondary-950)/<alpha-value>))',
        },
        'secondary-content':
          'var(--fallback-sc,oklch(var(--on-secondary)/<alpha-value>))',

        accent: {
          DEFAULT: 'oklch(var(--neutral-200)/<alpha-value>)',
          foreground: 'oklch(var(--neutral-700)/<alpha-value>)',
          50: 'var(--fallback-a,oklch(var(--accent-50)/<alpha-value>))',
          100: 'var(--fallback-a,oklch(var(--accent-100)/<alpha-value>))',
          200: 'var(--fallback-a,oklch(var(--accent-200)/<alpha-value>))',
          300: 'var(--fallback-a,oklch(var(--accent-300)/<alpha-value>))',
          400: 'var(--fallback-a,oklch(var(--accent-400)/<alpha-value>))',
          500: 'var(--fallback-a,oklch(var(--accent-500)/<alpha-value>))',
          600: 'var(--fallback-a,oklch(var(--accent-600)/<alpha-value>))',
          700: 'var(--fallback-a,oklch(var(--accent-700)/<alpha-value>))',
          800: 'var(--fallback-a,oklch(var(--accent-800)/<alpha-value>))',
          900: 'var(--fallback-a,oklch(var(--accent-900)/<alpha-value>))',
          950: 'var(--fallback-a,oklch(var(--accent-950)/<alpha-value>))',
        },
        'accent-content':
          'var(--fallback-ac,oklch(var(--on-accent)/<alpha-value>))',

        neutral: {
          DEFAULT: 'var(--fallback-n,oklch(var(--neutral)/<alpha-value>))',
          50: 'var(--fallback-n,oklch(var(--neutral-50)/<alpha-value>))',
          100: 'var(--fallback-n,oklch(var(--neutral-100)/<alpha-value>))',
          200: 'var(--fallback-n,oklch(var(--neutral-200)/<alpha-value>))',
          300: 'var(--fallback-n,oklch(var(--neutral-300)/<alpha-value>))',
          400: 'var(--fallback-n,oklch(var(--neutral-400)/<alpha-value>))',
          500: 'var(--fallback-n,oklch(var(--neutral-500)/<alpha-value>))',
          600: 'var(--fallback-n,oklch(var(--neutral-600)/<alpha-value>))',
          700: 'var(--fallback-n,oklch(var(--neutral-700)/<alpha-value>))',
          800: 'var(--fallback-n,oklch(var(--neutral-800)/<alpha-value>))',
          900: 'var(--fallback-n,oklch(var(--neutral-900)/<alpha-value>))',
          950: 'var(--fallback-n,oklch(var(--neutral-950)/<alpha-value>))',
        },
        'neutral-content':
          'var(--fallback-on-surface,oklch(var(--on-neutral)/<alpha-value>))',

        'base-100':
          'var(--fallback-surface,oklch(var(--base-100)/<alpha-value>))',
        'base-200':
          'var(--fallback-surface,oklch(var(--base-200)/<alpha-value>))',
        'base-300':
          'var(--fallback-surface,oklch(var(--base-300)/<alpha-value>))',
        'base-content':
          'var(--fallback-surface,oklch(var(--on-surface)/<alpha-value>))',

        info: {
          DEFAULT: 'var(--fallback-in,oklch(var(--info)/<alpha-value>))',
          50: 'var(--fallback-in,oklch(var(--info-50)/<alpha-value>))',
          100: 'var(--fallback-in,oklch(var(--info-100)/<alpha-value>))',
          200: 'var(--fallback-in,oklch(var(--info-200)/<alpha-value>))',
          300: 'var(--fallback-in,oklch(var(--info-300)/<alpha-value>))',
          400: 'var(--fallback-in,oklch(var(--info-400)/<alpha-value>))',
          500: 'var(--fallback-in,oklch(var(--info-500)/<alpha-value>))',
          600: 'var(--fallback-in,oklch(var(--info-600)/<alpha-value>))',
          700: 'var(--fallback-in,oklch(var(--info-700)/<alpha-value>))',
          800: 'var(--fallback-in,oklch(var(--info-800)/<alpha-value>))',
          900: 'var(--fallback-in,oklch(var(--info-900)/<alpha-value>))',
          950: 'var(--fallback-in,oklch(var(--info-950)/<alpha-value>))',
        },
        'info-content':
          'var(--fallback-inc,oklch(var(--on-info)/<alpha-value>))',

        success: {
          DEFAULT: 'var(--fallback-su,oklch(var(--success)/<alpha-value>))',
          50: 'var(--fallback-su,oklch(var(--success-50)/<alpha-value>))',
          100: 'var(--fallback-su,oklch(var(--success-100)/<alpha-value>))',
          200: 'var(--fallback-su,oklch(var(--success-200)/<alpha-value>))',
          300: 'var(--fallback-su,oklch(var(--success-300)/<alpha-value>))',
          400: 'var(--fallback-su,oklch(var(--success-400)/<alpha-value>))',
          500: 'var(--fallback-su,oklch(var(--success-500)/<alpha-value>))',
          600: 'var(--fallback-su,oklch(var(--success-600)/<alpha-value>))',
          700: 'var(--fallback-su,oklch(var(--success-700)/<alpha-value>))',
          800: 'var(--fallback-su,oklch(var(--success-800)/<alpha-value>))',
          900: 'var(--fallback-su,oklch(var(--success-900)/<alpha-value>))',
          950: 'var(--fallback-su,oklch(var(--success-950)/<alpha-value>))',
        },
        'success-content':
          'var(--fallback-suc,oklch(var(--on-success)/<alpha-value>))',

        warning: {
          DEFAULT: 'var(--fallback-wa,oklch(var(--warning)/<alpha-value>))',
          50: 'var(--fallback-wa,oklch(var(--warning-50)/<alpha-value>))',
          100: 'var(--fallback-wa,oklch(var(--warning-100)/<alpha-value>))',
          200: 'var(--fallback-wa,oklch(var(--warning-200)/<alpha-value>))',
          300: 'var(--fallback-wa,oklch(var(--warning-300)/<alpha-value>))',
          400: 'var(--fallback-wa,oklch(var(--warning-400)/<alpha-value>))',
          500: 'var(--fallback-wa,oklch(var(--warning-500)/<alpha-value>))',
          600: 'var(--fallback-wa,oklch(var(--warning-600)/<alpha-value>))',
          700: 'var(--fallback-wa,oklch(var(--warning-700)/<alpha-value>))',
          800: 'var(--fallback-wa,oklch(var(--warning-800)/<alpha-value>))',
          900: 'var(--fallback-wa,oklch(var(--warning-900)/<alpha-value>))',
          950: 'var(--fallback-wa,oklch(var(--warning-950)/<alpha-value>))',
        },
        'warning-content':
          'var(--fallback-wac,oklch(var(--on-warning)/<alpha-value>))',

        error: {
          DEFAULT: 'var(--fallback-er,oklch(var(--error)/<alpha-value>))',
          50: 'var(--fallback-er,oklch(var(--error-50)/<alpha-value>))',
          100: 'var(--fallback-er,oklch(var(--error-100)/<alpha-value>))',
          200: 'var(--fallback-er,oklch(var(--error-200)/<alpha-value>))',
          300: 'var(--fallback-er,oklch(var(--error-300)/<alpha-value>))',
          400: 'var(--fallback-er,oklch(var(--error-400)/<alpha-value>))',
          500: 'var(--fallback-er,oklch(var(--error-500)/<alpha-value>))',
          600: 'var(--fallback-er,oklch(var(--error-600)/<alpha-value>))',
          700: 'var(--fallback-er,oklch(var(--error-700)/<alpha-value>))',
          800: 'var(--fallback-er,oklch(var(--error-800)/<alpha-value>))',
          900: 'var(--fallback-er,oklch(var(--error-900)/<alpha-value>))',
          950: 'var(--fallback-er,oklch(var(--error-950)/<alpha-value>))',
        },
        'error-content':
          'var(--fallback-erc,oklch(var(--on-error)/<alpha-value>))',
      },
    },
  },
};

export default config;
