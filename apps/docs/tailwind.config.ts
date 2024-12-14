import type { Config } from "tailwindcss";

const config: Pick<Config, "presets" | "content" | "plugins" | "darkMode" | "theme"> = {
    darkMode: ["class"],
    content: [
		"./app/**/*.tsx",
		"../../packages/**/*.{js,ts,jsx,tsx}",
		"!../../packages/**/node_modules",
	],
	plugins: [require("@headlessui/tailwindcss"), require("tailwindcss-animate")],
    theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'oklch(var(--primary-50))',
    			foreground: 'oklch(var(--neutral-700))',
    			card: {
    				DEFAULT: 'oklch(var(--primary-50))',
    				foreground: 'oklch(var(--neutral-700))'
    			},
    			popover: {
    				DEFAULT: 'oklch(var(--primary-50))',
    				foreground: 'oklch(var(--neutral-700))'
    			},
    			primary: {
    				DEFAULT: 'oklch(var(--primary))',
    				foreground: 'oklch(var(--on-primary))'
    			},
    			secondary: {
    				DEFAULT: 'oklch(var(--secondary))',
    				foreground: 'oklch(var(--on-secondary))'
    			},
    			muted: {
    				DEFAULT: 'oklch(var(--neutral-200))',
    				foreground: 'oklch(var(--neutral-500))'
    			},
    			accent: {
    				DEFAULT: 'oklch(var(--neutral-200))',
    				foreground: 'oklch(var(--neutral-700))'
    			},
    			destructive: {
    				DEFAULT: 'oklch(var(--error))',
    				foreground: 'oklch(var(--on-error))'
    			},
    			border: 'oklch(var(--neutral-200))',
    			input: 'oklch(var(--neutral-600))',
    			ring: 'oklch(var(--neutral-100))',
    			chart: {
    				'1': 'oklch(var(--primary-rainbow-1))',
    				'2': 'oklch(var(--primary-rainbow-2))',
    				'3': 'oklch(var(--primary-rainbow-3))',
    				'4': 'oklch(var(--primary-rainbow-4))',
    				'5': 'oklch(var(--primary-rainbow-5))'
    			}
    		}
    	}
    }
};

export default config;
