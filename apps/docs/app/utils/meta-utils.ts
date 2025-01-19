interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function generateMeta({
  title = "Palette Bruh",
  description = "Create infinite palettes, save favorites, preview with real components, and export as CSS variables. The most powerful color palette generator for web projects.",
  image = "/og-image.jpg",
  url = "https://palette-bruh-docs.vercel.app/",
  type = "website"
}: MetaProps = {}) {
  const fullTitle = title === "Palette Bruh" ? title : `${title} | Palette Bruh`;
  
  return [
    { title: fullTitle },
    { name: "description", content: description },
    { name: "og:title", content: fullTitle },
    { name: "og:description", content: description },
    { name: "og:type", content: type },
    { name: "og:site_name", content: "Palette Bruh" },
    { property: "og:image", content: image },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
} 