import { Form, useLoaderData } from '@remix-run/react';
import { RiHeartLine } from '@remixicon/react';
import { generatePaletteName } from '@palettebruh/theme-generator/services';
import { AnimatedPalette } from '@palettebruh/theme-toolbar';
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from '@vercel/remix';
import { z } from 'zod';
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '~/components/PageHeader';
import { Button } from '~/components/ui/button';
import { favouritesCookie } from '~/lib/palette-store';
import { generateMeta } from '~/utils/meta-utils';

const paletteSchema = z.object({
  name: z.string().optional(),
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

const schema = z.object({
  palettes: z.array(paletteSchema).optional(),
});

export const meta: MetaFunction = () => {
  return generateMeta({
    title: 'Favorite Palettes',
    description: 'View and manage your saved color palettes. Create beautiful color combinations for your web projects and save them for later use.',
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  return { palettes: cookie.palettes ?? [] };
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = ((await favouritesCookie.parse(cookieHeader)) ||
    {}) as z.infer<typeof schema>;
  const bodyParams = await request.formData();
  const intent = bodyParams.get('intent');

  switch (intent) {
    case 'DELETE': {
      const palette = bodyParams.get('palette');
      cookie.palettes = cookie.palettes?.filter((p) => p.name !== palette);
      return new Response('Palette deleted', {
        headers: {
          'Set-Cookie': await favouritesCookie.serialize(cookie),
        },
      });
    }
    case 'DELETE_ALL':
      cookie.palettes = [];
      return new Response('Palette added', {
        headers: {
          'Set-Cookie': await favouritesCookie.serialize(cookie),
        },
      });
    case 'ADD': {
      const parsed = paletteSchema.safeParse(Object.fromEntries(bodyParams));

      if (!parsed.success) {
        return new Response('Invalid palette', {
          headers: {
            'Set-Cookie': await favouritesCookie.serialize(cookie),
          },
        });
      }

      const { primary, secondary, accent } = parsed.data;

      const response = await generatePaletteName({
        primary,
        secondary,
        accent,
      });

      cookie.palettes = [
        ...(cookie.palettes ?? []),
        {
          name: response.name,
          primary,
          secondary,
          accent,
        },
      ];

      return new Response('Palette added', {
        headers: {
          'Set-Cookie': await favouritesCookie.serialize(cookie),
        },
      });
    }
    default:
      return new Response('Invalid intent', { status: 400 });
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
            <Button
              size="sm"
              variant="destructive"
              type="submit"
              disabled={palettes.length === 0}
            >
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
                No favorites yet. Save some palettes to see them here.
                <br />
                To save a palette, generate a palette and click the{' '}
                <RiHeartLine className="inline-block size-5" /> button in the
                toolbar.
              </div>
            ) : (
              <div className="flex flex-row gap-4 gap-y-12 mb-8 flex-wrap">
                {palettes?.map((palette, index) => (
                  <AnimatedPalette
                    name={palette.name || `Palette ${index + 1}`}
                    key={palette.toString()}
                    colors={[
                      { hex: palette.primary },
                      { hex: palette.secondary },
                      { hex: palette.accent },
                    ]}
                    FormComponent={Form}
                    formAction="/favourites"
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
