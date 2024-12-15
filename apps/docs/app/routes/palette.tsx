import { NavLink } from "@remix-run/react";
import { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading } from "~/components/blocks/page-header";
import { BASE_TOKENS, STATUS_TOKENS } from "~/components/PaletteToolbar";
import { TokenColorPalette } from "~/components/TokenColorPalette";
import { Button } from "~/components/ui/button";

export default function Page() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>All your color shades</PageHeaderHeading>
        <PageHeaderDescription>
          Here you can find all the color shades used in the palette. You can
          copy the color value by clicking on the color.
        </PageHeaderDescription>
        <PageActions>
          <Button asChild size="sm">
            <NavLink to="/docs">Get Started</NavLink>
          </Button>
          <Button asChild size="sm" variant="ghost">
            <NavLink to="/blocks">Browse Blocks</NavLink>
          </Button>
        </PageActions>
      </PageHeader>

      <div className="mt-8 flex flex-col gap-y-4">
        {BASE_TOKENS.map((token) => (
          <TokenColorPalette token={token} key={token} />
        ))}
        {STATUS_TOKENS.map((token) => (
          <TokenColorPalette token={token} key={token} />
        ))}
      </div>
    </>
  )
}

