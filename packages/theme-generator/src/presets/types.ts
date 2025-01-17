import type { SchemistColor } from '../color/types';
import type defs from '../nodes';
import type { Args } from '../nodes/types';

export type PresetNode = {
  type: keyof typeof defs;
  token?: string;
  args?: Args;
  children?: PresetNode[];
  isHidden?: boolean;
  parent?: PresetNode;
  color?: SchemistColor;
};

export type Preset = {
  label: string;
  description?: string;
  nodes: PresetNode[];
};
