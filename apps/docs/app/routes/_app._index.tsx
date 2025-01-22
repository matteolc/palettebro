import type { MetaFunction } from '@vercel/remix';
import { Hero } from '~/components/Hero';
import { Isomorph } from '~/components/Isomorph';

export const meta: MetaFunction = () => {
  return [
    { title: 'Palettebro - AI-Powered Color Palette Generator' },
    {
      description:
        'Generate beautiful and harmonious color palettes using AI. Create, customize, and export color schemes for your design projects with ease.',
    },
    { 'og:title': 'Palettebro - AI-Powered Color Palette Generator' },
    {
      'og:description':
        'Generate beautiful and harmonious color palettes using AI. Create, customize, and export color schemes for your design projects with ease.',
    },
  ];
};

export default function Index() {
  return (
    <>
      <div className="container-wrapper">
        <div className="container flex items-center py-4">
          <Hero />
        </div>
      </div>
      {/* <div className="w-0 lg:w-full fixed flex justify-end">
        <Isomorph />
      </div> */}
    </>
  );
}
