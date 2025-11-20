export interface responseProducts {
  data: productProps[];
}

export interface productProps {
  id: string;
  code: string;
  name: string;
  image: string
  products: productsData[];
}

export interface productsData {
  id: string;
  is_active: boolean;
  code: string;
  name: string;
  description: string;
  image: any;
  ingredients: string;
  stock: number;
  normal_unit_price: string;
  unit_price_discount: string;
  created_at: string;
  brand: {
    id: string;
    code: string;
    name: string;
  };
  category: {
    id: string;
    code: string;
    name: string;
  };
}
