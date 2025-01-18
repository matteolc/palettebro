import { schemistToRgb } from './color/conversion';
import { formatRgbToHex } from './color/formatting';
import nearestColor from './color/nearest';
import type { SchemistColor } from './color/types';
import defs, { generateName } from './nodes';
import type { Args, NodeDef, Param } from './nodes/types';
import type { PresetNode } from './presets/types';
import { range } from './utils/generators';
import { interval } from './utils/math';

export const sample = (def: NodeDef, color: SchemistColor, ratio?: number) =>
  def.apply(
    color,
    Object.fromEntries(
      def.params.map((param) => [
        param.name,
        ratio !== undefined && param.type === 'range'
          ? interval(param.min, param.max, ratio)
          : param.default,
      ]),
    ),
  );

export const samples = (def: NodeDef, color: SchemistColor, count: number) =>
  range(count).map((i) => sample(def, color, i / (count - 1)));

export const paramSample = (
  def: NodeDef,
  args: Args,
  paramName: Param['name'],
  color: SchemistColor,
  ratio: number,
) =>
  def.apply(
    color,
    Object.fromEntries(
      def.params.map((param) => [
        param.name,
        param.name === paramName && param.type === 'range'
          ? interval(param.min, param.max, ratio)
          : param.name in args
            ? args[param.name]
            : param.default,
      ]),
    ),
  );

export const paramSamples = (
  def: NodeDef,
  args: Args,
  paramName: Param['name'],
  color: SchemistColor,
  count: number,
) =>
  range(count).map((_, i) =>
    paramSample(def, args, paramName, color, i / (count - 1)),
  );

export const presetSample = (def: NodeDef, color: SchemistColor, args?: Args) =>
  def.apply(
    color,
    Object.fromEntries(
      def.params.map(({ name, default: d }) => [
        name,
        args && name in args ? args[name] : d,
      ]),
    ),
  );

export const presetSamples = (nodes: PresetNode[], color: SchemistColor) =>
  nodes.flatMap(({ type, args, children, isHidden }) => {
    const def = defs[type];
    const sample = presetSample(def, color, args);
    const samples: SchemistColor[] = [];

    if (!isHidden) {
      samples.push(sample);
    }

    if (children) {
      samples.push(...presetSamples(children, sample));
    }

    return samples;
  });

export const presetSamplesWithKeyAndName = (
  nodes: PresetNode[],
  color: SchemistColor,
  parentToken?: string,
) => {
  return nodes.flatMap(({ type, args, children, isHidden, token }) => {
    const def = defs[type];
    const sample = presetSample(def, color, args);
    const key = generateName(token, color, parentToken);
    const name = generateName(undefined, sample);
    const samples: [string, string, SchemistColor][] = [];

    if (!isHidden) {
      samples.push([key, name, sample]);
    }

    if (children) {
      samples.push(...presetSamplesWithKeyAndName(children, sample, token));
    }

    return samples;
  });
};

export const presetSampleWithKeyAndNameHash = (
  samples: [string, string, SchemistColor][],
) =>
  Object.fromEntries(
    samples.map(([key, name, color]) => [
      key,
      { name, color: formatRgbToHex(schemistToRgb(color)) },
    ]),
  );

export { nearestColor };
export * from './color/contrast';
export * from './color/formatting';
export * from './color/parsing';
export * from './color/conversion';
export * from './utils/css';
export * from './utils/generators';
export * from './utils/oklch';
export * from './color/manipulation';
export * from './const';
