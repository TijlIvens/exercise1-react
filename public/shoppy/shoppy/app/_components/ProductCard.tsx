import { Product } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export type ProductCardProps = {
  product: Product;
  productAmount: number;
  onAddToCart: (id: string) => void;
};

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full p-0 gap-0 hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-ring">
      <Link href={`/product/${product.id}`}>
        <div className="w-full aspect-[2/3] shrink-0 pointer-events-none">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <CardContent className="p-4 flex-grow flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg leading-snug">{product.name}</CardTitle>
        <div className="flex items-center gap-2">
          <p className="text-sm">{product.pricePerUnit}€</p>
          <Button
            onClick={() => {
              onAddToCart(product.id.toString());
            }}
          >
            <i className="fa-solid fa-cart-plus"></i>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
