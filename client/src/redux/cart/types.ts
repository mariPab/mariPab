export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  tags: string[];
}
export interface CartStore {
  products: Product[];
}
