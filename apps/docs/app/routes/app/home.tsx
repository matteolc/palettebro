
import { ThemeVariantEnum } from '@palettebro/theme-generator';
import { Badge } from '~/components/ui/badge';
import { PaletteContext } from '@palettebro/theme-toolbar';
import clsx from 'clsx';
import { useContext } from 'react';
import { PageActions } from '~/components/PageHeader';
import { Button } from '~/components/ui/button';
import { type MetaFunction, NavLink } from 'react-router';

export const meta: MetaFunction = () => {
  return [
    { title: 'Palettebro - AI-Powered Color Palette Generator' },
    {
      description:
        'Generate beautiful and harmonious color palettes using AI. Create, customize, and export color schemes for your design projects with ease.',
    },
    { 'og:title': 'Palettebro - AI-Powered Color Palette Generator' },
    {
      'og:description':
        'Generate beautiful and harmonious color palettes using AI. Create, customize, and export color schemes for your design projects with ease.',
    },
  ];
};

export default function Index() {
  const { variant } = useContext(PaletteContext);
  const gradient =
    variant === ThemeVariantEnum.mui
      ? 'title-gradient-mui'
      : 'title-gradient-tw';

  return (
    <>
      <div className="container-wrapper">
        <div className="container flex items-center py-4">
          <div className="max-w-2xl mx-auto lg:mx-0 mt-20 z-40">
            <Badge
              variant="accent"
              className="mb-4 text-md rounded-full text-on-accent border-accent"
            >
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-on-accent" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-on-accent" />
              </span>
              Introducing Palettebro 1.0
            </Badge>

            <h1
              className={clsx(
                gradient,
                'scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-5xl lg:leading-tight title-gradient text-transparent bg-clip-text',
              )}
            >
              The best color palette generator for the web. Ever.
            </h1>
            <p className="mt-4 max-w-xl lg:text-xl text-2xl">
              Generate beautiful and harmonious color palettes. See how they
              look with real components. Download all the colors as CSS tokens
              or use Palettebro in your React application. It's that simple.
            </p>
            <div className="block lg:hidden mt-8">
              To use Palettebro please use a screen with a width of at least
              1024px.
            </div>
            <PageActions>
              <Button asChild size="sm">
                <NavLink to="/docs">Get Started</NavLink>
              </Button>
              <Button
                asChild
                size="sm"
                variant="link"
                className="text-muted-foreground"
              >
                <NavLink to="/examples">Examples</NavLink>
              </Button>
            </PageActions>
          </div>
        </div>
      </div>
    </>
  );
}
