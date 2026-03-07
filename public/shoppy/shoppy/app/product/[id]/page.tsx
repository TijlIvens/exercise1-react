import { Header } from "../../../components/Header";
import { ProductDetailCard } from "./_components/ProductDetailCard";
import products from "../../../public/products.json";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = products.groceryProducts.find(
    (product) => product.id.toString() === id,
  );

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header showBack={true} />
        <main className="container mx-auto px-4 py-8 flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-muted-foreground">Product not found</h1>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Header showBack={true} />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <ProductDetailCard product={product} />
      </main>
    </div>
  );
}
