import type { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme';
import type { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone';
import { useRouteLoaderData } from '@remix-run/react';
import type { Jsonify } from '@remix-run/server-runtime/dist/jsonify';
import type { ClientHintsValue } from 'node_modules/@epic-web/client-hints/dist/utils';

import type { loader as rootLoader } from '~/root';
import type { Nullable } from '~/types';

export function useRequestInfo(): Jsonify<{
  hints: ClientHintsValue<{
    theme: typeof colorSchemeHint;
    timeZone: typeof timeZoneHint;
  }>;
  origin: Nullable<string>;
  path: string;
}> {
  const data = useRouteLoaderData<typeof rootLoader>('root');
  if (!data?.requestInfo)
    throw new Error('No request info found in Root loader.');

  return data.requestInfo;
}
