import type { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme';
import type { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone';
import { useRouteLoaderData } from 'react-router';
import type { ClientHintsValue } from 'node_modules/@epic-web/client-hints/dist/utils';
import type { Nullable } from '~/types';
import type { Route } from '../+types/root';

export function useRequestInfo(): {
  hints: ClientHintsValue<{
    theme: typeof colorSchemeHint;
    timeZone: typeof timeZoneHint;
  }>;
  origin: Nullable<string>;
  path: string;
} {
  const data = useRouteLoaderData<Route.ComponentProps["loaderData"]>('root');
  if (!data?.requestInfo)
    throw new Error('No request info found in Root loader.');

  return data.requestInfo;
}
