import nearestColor from 'nearest-color';
import colornames from '../data/colornames.bestof.json';

const find = nearestColor.from(
  Object.fromEntries(
    colornames.map(({ name, hex }: { name: string; hex: string }) => [
      name,
      hex,
    ]),
  ),
);

export default (hex: string) => {
  try {
    return find(hex).name;
  } catch (e) {
    return hex;
  }
};
