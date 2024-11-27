import type { ActionFunctionArgs, LoaderFunction } from "@vercel/remix";
import { redirect } from "@vercel/remix";
import { safeRedirect } from "remix-utils/safe-redirect";

import { type Theme, ThemeSchema, setTheme } from "~/hooks/use-theme";

async function action({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());
  const { theme, redirectTo } = ThemeSchema.parse(formData);

  const responseInit = {
    headers: { "Set-Cookie": setTheme(theme as Theme) },
  };

  if (redirectTo) {
    return redirect(safeRedirect(redirectTo), responseInit);
  }
  return new Response(null, responseInit);
}

const loader: LoaderFunction = async () => {
  return new Response(null);
};

export { action, loader };
