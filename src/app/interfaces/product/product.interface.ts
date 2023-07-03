export interface Order {
  id: number;
  currency: string;
  line_items: LineItem[];
  quantity: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string
  }
  shipping: {
    state: string;
    address_1: string;
    address_2: string;
    postcode: string;
    city: string;
    country: string
  }
}

export interface LineItem {
  name: string;
  price: string;
  total: string;
  product_id: number;
  quantity: string;
}
