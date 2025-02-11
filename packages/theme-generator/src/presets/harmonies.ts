import splitComplementary from './splitComplementary';
import tetrad from './tetrad';
import triad from './triad';
import type { Preset } from './types';

export default {
  label: 'Harmonies',
  description: 'All available color harmonies',
  nodes: [
    tetrad.nodes[0],
    triad.nodes[0],
    ...splitComplementary.nodes,
    triad.nodes[1],
    tetrad.nodes[1],
  ],
} as Preset;
