import { Hero } from '~/components/Hero';
import { Isomorph } from '~/components/Isomorph';

export default function Index() {
  return (
    <>
      <div className="container-wrapper">
        <div className="container flex items-center py-4">
          <Hero />
        </div>
      </div>
      <div className="w-0 lg:w-full fixed flex justify-end">
        <Isomorph />
      </div>
    </>
  );
}
