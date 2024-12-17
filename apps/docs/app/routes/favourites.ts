import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
} from "@vercel/remix";
import { favouritesCookie } from "~/lib/palette-store";
import { z } from "zod";

const paletteSchema = z.object({
	name: z.string(),
	primary: z.string(),
	secondary: z.string(),
	accent: z.string(),
});

const schema = z.object({
	palettes: z.array(paletteSchema).optional()
});

export async function loader({ request }: LoaderFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const cookie = ((await favouritesCookie.parse(cookieHeader)) || {}) as z.infer<typeof schema>;
	return { palettes: cookie.palettes ?? [] };
}

export async function action({ request }: ActionFunctionArgs) {
	const cookieHeader = request.headers.get("Cookie");
	const cookie = ((await favouritesCookie.parse(cookieHeader)) || {}) as z.infer<typeof schema>;
	const bodyParams = await request.formData();
	const parsed = paletteSchema.safeParse(Object.fromEntries(bodyParams));

	if (!parsed.success) {
		return new Response("Invalid palette", {
			headers: {
				"Set-Cookie": await favouritesCookie.serialize(cookie),
			},
		});
	}

	const { name, primary, secondary, accent } = parsed.data;

	cookie.palettes = [
		...(cookie.palettes ?? []),
		{
			name,
			primary,
			secondary,
			accent,
		},
	];

	return new Response("Palette added", {
		headers: {
			"Set-Cookie": await favouritesCookie.serialize(cookie),
		},
	});
}
