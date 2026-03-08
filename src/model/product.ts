export class Product {
  product_id: number;
  name: string;
  description: string;
  img_url: string;
  price: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  category: string;

  constructor(data: Partial<Product>) {
    this.product_id = data.product_id || 0;
    this.name = data.name || "";
    this.description = data.description || "";
    this.img_url = data.img_url || "";
    this.price = data.price || "";
    this.slug = data.slug || "";
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
    this.category = data.category || "";
  }
}
