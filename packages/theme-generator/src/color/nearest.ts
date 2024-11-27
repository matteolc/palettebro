import colornames from "color-name-list/bestof.json"; // TODO: Fix this import
import nearestColor from "nearest-color";

const find = nearestColor.from(
  Object.fromEntries(
    colornames.map(({ name, hex }: { name: string; hex: string }) => [
      name,
      hex,
    ])
  )
);

export default (hex: string) => {
  try {
    return find(hex).name;
  } catch (e) {
    return hex;
  }
};
