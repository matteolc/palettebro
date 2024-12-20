import { Badge } from './ui/badge';

export const Hero = () => {
  return (
    <div className="max-w-2xl mx-auto mt-20 z-50">
      <Badge variant="outline" className="mb-4 text-md rounded-full">
        <span className="relative flex h-3 w-3 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"/>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-300"/>
        </span>
        Introducing Palettebruh 1.0
      </Badge>

      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-accent-700 via-secondary-500 to-accent-300 text-transparent bg-clip-text">
        The best color palette generator for the web. Ever.
      </h1>
      <p className="mt-4 max-w-xl text-xl text-neutral-800">
        Create infinite palettes. Save your favourite ones. See how they look with real components. Download all the colors as CSS token variables. Use them in your web project. It's that simple.
      </p>
      <div className="block lg:hidden mt-8">
        To use Palettebruh please use a screen with a width of at least 1024px.
       </div>
    </div>
  );
};
