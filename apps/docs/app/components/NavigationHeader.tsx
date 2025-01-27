import { Link, NavLink } from '@remix-run/react';
import clsx from 'clsx';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useContext, useState } from 'react';
import { sentenceCase } from '@palettebro/theme-generator';
import { PaletteContext } from '@palettebro/theme-toolbar';
import { ColorShadesPresetEnum } from '@palettebro/theme-generator/types';

const NavigationHeader = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { variant, colorShadesPreset } = useContext(PaletteContext);

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (current === 0) {
      setIsScrolled(false);
    } else if (current > 0 && !isScrolled) {
      setIsScrolled(true);
    }
  });

  const gradient =
    colorShadesPreset === ColorShadesPresetEnum.mui
      ? 'title-gradient-mui'
      : 'title-gradient-tw';

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        'left-0 max-w-2xl right-0 py-1 fixed inset-x-3 top-4 z-50 mx-auto flex justify-center overflow-hidden rounded-lg transition-all duration-300',
        isScrolled
          ? 'bg-background/95 lg:max-w-3xl lg:border-border lg:bg-background/95 lg:shadow-xl lg:shadow-black/5 lg:border '
          : 'lg:max-w-full bg-white/0',
      )}
    >
      <div
        className={clsx(isScrolled ? 'border-none' : '', 'container-wrapper')}
      >
        <motion.nav
          className={clsx(
            'items-center justify-between container w-full flex gap-12',
          )}
        >
          <Link to="/">
            <h2
              className={clsx(
                gradient,
                'cursor-pointer title-gradient text-3xl font-bold leading-relaxed text-transparent bg-clip-text',
              )}
            >
              🌈 Palettebro
            </h2>
          </Link>
          <div className="hidden lg:flex gap-4 items-center">
            <ul className="inline-flex h-9 items-center justify-center rounded-lg bg-muted-foreground p-1 text-muted">
              {['palette', 'examples', 'blocks', 'favourites'].map((item) => (
                <NavLink
                  to={`/${item}`}
                  key={item}
                  className={({ isActive, isPending }) =>
                    clsx(
                      isActive ? 'bg-background text-foreground shadow' : '',
                      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                    )
                  }
                >
                  {sentenceCase(item)}
                </NavLink>
              ))}
            </ul>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};

export { NavigationHeader };
