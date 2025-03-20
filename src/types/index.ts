
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  sizes?: string[];
  description: string;
  brand: string;
  material?: string;
  purpose?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
