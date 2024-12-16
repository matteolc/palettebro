import type { Config } from "tailwindcss";

const config: Pick<
	Config,
	"presets" | "content" | "plugins" | "darkMode" | "theme"
> = {
	darkMode: ["class"],
	content: [
		"./app/**/*.tsx",
		"../../packages/**/*.{js,ts,jsx,tsx}",
		"!../../packages/**/node_modules",
	],
	plugins: [require("tailwindcss-animate")],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'oklch(var(--primary-50)/<alpha-value>)',
    			foreground: 'oklch(var(--neutral-700)/<alpha-value>)',
    			card: {
    				DEFAULT: 'oklch(var(--primary-50))',
    				foreground: 'oklch(var(--neutral-700))'
    			},
    			popover: {
    				DEFAULT: 'oklch(var(--primary-50))',
    				foreground: 'oklch(var(--neutral-700))'
    			},
    			primary: {
    				DEFAULT: 'oklch(var(--primary)/<alpha-value>)',
    				foreground: 'oklch(var(--on-primary)/<alpha-value>)'
    			},
    			secondary: {
    				DEFAULT: 'oklch(var(--secondary)/<alpha-value>)',
    				foreground: 'oklch(var(--on-secondary)/<alpha-value>)'
    			},
    			muted: {
    				DEFAULT: 'oklch(var(--neutral-200)/<alpha-value>)',
    				foreground: 'oklch(var(--neutral-500)/<alpha-value>)'
    			},
    			accent: {
    				DEFAULT: 'oklch(var(--neutral-200)/<alpha-value>)',
    				foreground: 'oklch(var(--neutral-700)/<alpha-value>)'
    			},
    			destructive: {
    				DEFAULT: 'oklch(var(--error)/<alpha-value>)',
    				foreground: 'oklch(var(--on-error)/<alpha-value>)'
    			},
    			border: 'oklch(var(--neutral-200)/<alpha-value>)',
    			input: 'oklch(var(--neutral-200)/<alpha-value>)',
    			ring: 'oklch(var(--neutral-100)/<alpha-value>)',
    			chart: {
    				'1': 'oklch(var(--primary-rainbow-1))',
    				'2': 'oklch(var(--primary-rainbow-2))',
    				'3': 'oklch(var(--primary-rainbow-3))',
    				'4': 'oklch(var(--primary-rainbow-4))',
    				'5': 'oklch(var(--primary-rainbow-5))'
    			},
    			sidebar: {
    				DEFAULT: 'oklch(var(--primary-100))',
    				foreground: 'oklch(var(--neutral-700))',
    				primary: 'oklch(var(--primary))',
    				'primary-foreground': 'oklch(var(--on-primary))',
    				accent: 'oklch(var(--accent))',
    				'accent-foreground': 'oklch(var(--on-accent))',
    				border: 'oklch(var(--neutral-200))',
    				ring: 'oklch(var(--neutral-100))'
    			}
    		}
    	}
    },
};

export default config;
