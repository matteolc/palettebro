import { Star } from 'lucide-react';
import type React from 'react';
import { Badge } from '@palettebro/shadcn-ui/badge';
import { Button } from '@palettebro/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@palettebro/shadcn-ui/card';

interface ProductCardProps {
  name?: string;
  price?: number;
  category?: string;
  rating?: number;
  imageUrl?: string;
}

export const CardsProductOutOfStock: React.FC<ProductCardProps> = ({
  name = 'Product Name',
  price = 0,
  category = 'Uncategorized',
  rating = 0,
  imageUrl = '/product-1.jpg',
}) => {
  // Generate star rating display
  const renderStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        key={index}
        color={'oklch(var(--accent))'}
        fill={index < currentRating ? 'oklch(var(--accent))' : 'none'}
        size={20}
      />
    ));
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <CardHeader className="relative p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 z-10 px-2 py-1"
          >
            {category}
          </Badge>
          <img
            src="/product-1.jpg"
            alt="Product"
            width="500"
            height="500"
            className="w-full h-64 object-cover"
          />
        </div>
      </CardHeader>

      <div>
        <CardContent>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold">
              ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
            </span>
            <div className="flex space-x-1">{renderStars(rating || 0)}</div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">
            <span className="text-on-primary">
              Add to cart
            </span>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
