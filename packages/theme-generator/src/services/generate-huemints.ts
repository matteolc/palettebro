export interface GenerateHuemintsParams {
  mode: 'diffusion' | 'transformer' | 'random';
  colors: number;
  temperature: number;
  page: 'website-magazine' | 'brand-2' | 'brand-3' | 'website-1';
  preset: string;
  adjacency: string[];
  palette: string[];
}

export async function generateHuemints({
  mode,
  colors,
  temperature,
  page,
  preset,
  adjacency,
  palette,
}: GenerateHuemintsParams) {
  const cfg = {
    preset,
    mode,
    num_colors: colors,
    temperature,
    num_results: mode !== 'diffusion' ? 50 : 5,
    page,
    adjacency,
    palette,
  };

  const data = await fetch('https://api.huemint.com/color', {
    method: 'POST',
    body: JSON.stringify(cfg),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return data.json();
}
