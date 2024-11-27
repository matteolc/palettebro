import { useFetcher } from '@remix-run/react';
import { defaultThemes } from '@repo/tailwind-theme';

const ThemeSelector = () => {
    const fetcher = useFetcher({ key: 'theme-fetcher' });
    return (
        <fetcher.Form
            method="POST"
            action="/switch-theme"
            className="flex gap-2"
        >
            <div className='grid grid-cols-6 gap-2 max-w-sm'>
                {Object.keys(defaultThemes).map((theme) => (
                    <button
                        type="submit"
                        name="theme"
                        value={theme}
                        key={theme}
                        aria-label="Theme select"
                        tabIndex={0}
                        className="size-6 bg-transparent border border-white/20 rounded-full"
                        style={{ backgroundColor: defaultThemes[theme as keyof typeof defaultThemes].baseColors.primary }}
                    >
                    </button>
                ))}
            </div>
        </fetcher.Form>

    );
}

export { ThemeSelector };