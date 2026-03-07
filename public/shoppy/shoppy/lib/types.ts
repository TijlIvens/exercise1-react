export interface ProductsData {
  groceryProducts: Product[];
}

export interface Product {
  id: number;
  name: string;
  pricePerUnit: number;
  unit: string;
  amount: number;
  category: string;
  image: string;
  description: string;
}
