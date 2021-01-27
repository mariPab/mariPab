declare namespace Product {
  interface Product {
    id: string;
    name: string;
    description: string;
    images: string[];
    price: number;
    tags?: string[];
  }
  interface Store {
    init: boolean;
    data: Product[];
    loading: boolean;
    search: string;
    error: boolean;
    tags: string[];
    activeTags: string[];
    activeProduct: Product | null;
  }
}
