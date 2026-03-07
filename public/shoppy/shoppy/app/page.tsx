import { Header } from "../components/Header";
import { PageContent } from "./_components/PageContent";
import products from "../public/products.json";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent products={products.groceryProducts} />
    </div>
  );
}
