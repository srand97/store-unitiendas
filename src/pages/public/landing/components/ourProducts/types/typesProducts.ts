export interface ResponseProducts {
  data: ProductProps[];
}

export interface ProductProps {
  id?: string | number;
  code?: string;
  name?: string;
  image?: string;
  description?: string;
  products?: ProductsData[] | any[];
}

export interface ProductsData {
  id: string;
  is_active: boolean;
  code: string;
  name: string;
  description: string;
  image: any;
  stock: number;
  normal_unit_price: string;
  unit_price_discount: string;
  created_at: string;
  weight: string;
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
  new: boolean;
}
