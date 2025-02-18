import { Link, useLocation } from 'react-router';
import {
  ScrollArea,
  ScrollBar,
} from '@palettebro/shadcn-ui/scroll-area';
import { registryCategories } from './registry-categories';

export function BlocksNav() {
  const pathname = useLocation().pathname;

  return (
    <div className="relative overflow-hidden">
      <ScrollArea className="max-w-none">
        <div className="flex items-center">
          <BlocksNavLink
            category={{ name: 'Featured', slug: '', hidden: false }}
            isActive={pathname === '/blocks'}
          />
          {registryCategories.map((category) => (
            <BlocksNavLink
              key={category.slug}
              category={category}
              isActive={pathname === `/blocks/${category.slug}`}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  );
}

function BlocksNavLink({
  category,
  isActive,
}: {
  category: (typeof registryCategories)[number];
  isActive: boolean;
}) {
  if (category.hidden) {
    return null;
  }

  return (
    <Link
      to={`/blocks/${category.slug}`}
      key={category.slug}
      className="flex h-7 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground"
      data-active={isActive}
    >
      {category.name}
    </Link>
  );
}
