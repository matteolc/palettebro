import type {
  GenerativeThemeMode,
  GenerativeThemePage,
  GenerativeThemePreset,
} from '../types';

export interface GenerateHuemintsParams {
  mode: GenerativeThemeMode;
  colors: number;
  temperature: number;
  page: GenerativeThemePage;
  preset: GenerativeThemePreset;
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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch('https://api.huemint.com/color', {
      method: 'POST',
      body: JSON.stringify(cfg),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Read the response as an array buffer first
    const buffer = await response.arrayBuffer();
    const decoder = new TextDecoder();
    const text = decoder.decode(buffer);

    if (!text) {
      throw new Error('Empty response received from server');
    }

    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.error('Request failed:', error);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out after 10 seconds');
    }
    throw error;
  }
}
