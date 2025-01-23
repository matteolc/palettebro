import nodeFetch from 'node-fetch';

export interface ExtractedWebContent {
  html: string;
  css: string[];
  colors: Set<string>;
}

export async function extractWebContent(url: string): Promise<ExtractedWebContent> {
  try {
    const response = await nodeFetch(url);
    const html = await response.text();
    
    // Extract all CSS content
    const cssLinks = html.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]*)"[^>]*>/g) || [];
    const cssUrls = cssLinks.map(link => {
      const match = link.match(/href="([^"]*)"/);
      return match ? match[1] : null;
    }).filter(Boolean) as string[];
    
    // Make all relative URLs absolute
    const cssAbsoluteUrls = cssUrls.map(cssUrl => {
      try {
        return new URL(cssUrl, url).href;
      } catch {
        return cssUrl;
      }
    });
    
    // Fetch all CSS content
    const cssContents = await Promise.all(
      cssAbsoluteUrls.map(async cssUrl => {
        try {
          const cssResponse = await nodeFetch(cssUrl);
          return await cssResponse.text();
        } catch (error) {
          console.warn(`Failed to fetch CSS from ${cssUrl}:`, error);
          return '';
        }
      })
    );
    
    // Extract inline styles
    const inlineStyles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
    const inlineStylesContent = inlineStyles.map(style => {
      const match = style.match(/<style[^>]*>([\s\S]*?)<\/style>/);
      return match ? match[1] : '';
    });
    
    // Combine all CSS content
    const allCss = [...cssContents, ...inlineStylesContent];
    
    // Extract colors from CSS
    const colorRegex = /#([0-9A-Fa-f]{3}){1,2}\b|#([0-9A-Fa-f]{4}){1,2}\b|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)|hsl\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*\)|hsla\(\s*\d+\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+\s*\)/g;
    
    const colors = new Set<string>();
    for (const css of allCss) {
      const matches = css.match(colorRegex) || [];
      for (const color of matches) {
        colors.add(color);
      }
    }
    
    return {
      html,
      css: allCss,
      colors
    };
  } catch (error) {
    console.error('Failed to extract web content:', error);
    throw error;
  }
} 