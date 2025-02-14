import { createCookie } from 'react-router';

export const FAVOURITES_COOKIE_NAME = 'palettes';

export const favouritesCookie = createCookie(FAVOURITES_COOKIE_NAME, {
  maxAge: 604_800,
  sameSite: 'lax',
  path: '/',
});
