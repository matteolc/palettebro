interface OgImageProps {
  title: string;
}

export async function generateOgImage({ title }: OgImageProps) {
  // Basic SVG template for OG image
  return `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#18181B"/>
      <text 
        x="50%" 
        y="50%" 
        text-anchor="middle" 
        font-family="system-ui" 
        font-size="64" 
        font-weight="bold" 
        fill="white"
      >
        ${title}
      </text>
    </svg>
  `.trim();
} 