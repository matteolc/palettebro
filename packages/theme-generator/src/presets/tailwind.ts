import neutral from './neutral';
import semanticPairs from './semanticPairs';
import type { Preset } from './types';

export default {
  label: 'Tailwind theme',
  description: 'A theme based on the Tailwind CSS color palette',
  nodes: [...semanticPairs.nodes, ...neutral.nodes],
} as Preset;
