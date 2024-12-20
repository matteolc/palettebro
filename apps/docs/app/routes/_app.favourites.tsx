import { Form, useLoaderData } from "@remix-run/react";
import {
  AnimatedPalette,
  FavoritePaletteCard,
} from "~/components/palette/FavouritePaletteCard";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix";
import { favouritesCookie } from "~/lib/palette-store";
import { z } from "zod";
import { getGeneratorChain } from "~/lib/palette-name-generator";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/PageHeader";
import { Button } from "~/components/ui/button";
import { RiHeartLine } from "@remixicon/react";

const paletteSchema = z.object({
  name: z.string().optional(),
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
  neutral: z.string(),
});

const schema = z.object({
  palettes: z.array(paletteSchema).optional(),
});

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  return { palettes: cookie.palettes ?? [] };
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  const bodyParams = await request.formData();
  const intent = bodyParams.get("intent");

  switch (intent) {
    case "DELETE": {
      const palette = bodyParams.get("palette");
      cookie.palettes = cookie.palettes?.filter(
        (p) => p.name !== palette
      );
      return new Response("Palette deleted", {
        headers: {
          "Set-Cookie": await favouritesCookie.serialize(cookie),
        },
      });
    }
    case "DELETE_ALL":
      cookie.palettes = [];
      return new Response("Palette added", {
        headers: {
          "Set-Cookie": await favouritesCookie.serialize(cookie),
        },
      });
    case "ADD": {
      const parsed = paletteSchema.safeParse(Object.fromEntries(bodyParams));

      if (!parsed.success) {
        return new Response("Invalid palette", {
          headers: {
            "Set-Cookie": await favouritesCookie.serialize(cookie),
          },
        });
      }
    
      const { chain, parser } = getGeneratorChain();
      const { primary, secondary, accent, neutral } = parsed.data;
    
      const response = await chain.invoke({
        question: "Please generate a name for this color palette.",
        format_instructions: parser.getFormatInstructions(),
        primary_color: primary,
        secondary_color: secondary,
      });
    
      cookie.palettes = [
        ...(cookie.palettes ?? []),
        {
          name: response.name,
          primary,
          secondary,
          accent,
          neutral,
        },
      ];
    
      return new Response("Palette added", {
        headers: {
          "Set-Cookie": await favouritesCookie.serialize(cookie),
        },
      });
    }
      default:
        return new Response("Invalid intent", { status: 400 });
  }

  
}

export default function Page() {
  const { palettes } = useLoaderData<typeof loader>();

  return (
    <div className="">
      <PageHeader>
        <PageHeaderHeading>Favorite Palettes</PageHeaderHeading>
        <PageHeaderDescription>
          Your saved color combinations.
        </PageHeaderDescription>
        <PageActions>
          <Form method="POST" action="/favourites">
          <input type="hidden" name="intent" value="DELETE_ALL" />
          <Button size="sm" variant="destructive" type="submit" disabled={palettes.length === 0}>
            Delete all
          </Button>
          </Form>
        </PageActions>
      </PageHeader>
      <div id="blocks" className="border-grid scroll-mt-24 border-b">
        <div className="container-wrapper">
          <div className="container flex items-center py-4">
            {palettes.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground mx-auto">
                No favorites yet. Save some palettes to see them here.<br />
                To save a palette, generate a palette and click the <RiHeartLine className="inline-block size-5" /> button in the toolbar.
              </div>
            ) : (
              <div className="flex flex-row gap-4 gap-y-12 mb-8 flex-wrap">
                {palettes?.map((palette, index) => (
                  <AnimatedPalette
                    name={palette.name || `Palette ${index + 1}`}
                    key={palette.toString()}
                    colors={[
                      { hex: palette.neutral },
                      { hex: palette.accent },
                      { hex: palette.secondary },
                      { hex: palette.primary },
                    ]}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
