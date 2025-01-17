import { Badge } from '~/components/ui/badge';
/**
 * v0 by Vercel.
 * ~see https://v0.dev/t/LVLQojrG3ul
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardDescription, CardTitle } from '~/components/ui/card';

export function CardsProduct() {
  return (
    <Card className="space-y-4 shadow rounded-lg p-6">
      <img
        src="/product-1.jpg"
        alt="Product"
        width="500"
        height="500"
        className="w-full h-64 object-cover rounded-lg"
        style={{ aspectRatio: '500/500', objectFit: 'cover' }}
      />
      <div className="flex justify-between items-baseline">
        <CardTitle className="font-bold text-2xl">Fancy Watch</CardTitle>
        <Badge
          className="text-sm py-1 px-2 rounded-full"
          style={{
            backgroundColor: 'oklch(var(--info-container))',
            color: 'oklch(var(--on-info-container))',
          }}
        >
          Category
        </Badge>
      </div>
      <CardDescription className="">
        A fancy watch for your wrist. It's a great accessory for any outfit.
      </CardDescription>
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">$99</div>
        <div className="flex gap-1">
          <StarIcon
            className="w-5 h-5"
            style={{
              color: 'oklch(var(--accent))',
              fill: 'oklch(var(--accent))',
            }}
          />
          <StarIcon
            className="w-5 h-5"
            style={{
              color: 'oklch(var(--accent))',
              fill: 'oklch(var(--accent))',
            }}
          />
          <StarIcon
            className="w-5 h-5"
            style={{
              color: 'oklch(var(--accent))',
              fill: 'oklch(var(--accent))',
            }}
          />
          <StarIcon
            className="w-5 h-5"
            style={{
              color: 'oklch(var(--accent))',
              fill: 'oklch(var(--accent))',
            }}
          />
          <StarIcon
            className="w-5 h-5"
            style={{ color: 'oklch(var(--neutral))' }}
          />
        </div>
      </div>
    </Card>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
