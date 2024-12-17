import { createCookie } from "@vercel/remix";

export const FAVOURITES_COOKIE_NAME = "palettes";

export const favouritesCookie = createCookie(FAVOURITES_COOKIE_NAME, {
  maxAge: 604_800,
});