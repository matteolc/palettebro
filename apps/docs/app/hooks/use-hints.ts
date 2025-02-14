/**
 * Client Hints MDX:
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Client_hints
 */
import { getHintUtils } from '@epic-web/client-hints';
import { clientHint as colorSchemeHint } from '@epic-web/client-hints/color-scheme';
import { clientHint as timeZoneHint } from '@epic-web/client-hints/time-zone';
import type { ClientHintsValue } from 'node_modules/@epic-web/client-hints/dist/utils';

import { useRequestInfo } from '~/hooks/use-request-info';

const hintsUtils = getHintUtils({
  theme: colorSchemeHint,
  timeZone: timeZoneHint,
});
const { getHints } = hintsUtils;

function useHints(): ClientHintsValue<{
  theme: typeof colorSchemeHint;
  timeZone: typeof timeZoneHint;
}> {
  const requestInfo = useRequestInfo();
  return requestInfo.hints;
}

export { useHints, getHints, hintsUtils };
