export class Order {
  order_id: number;
  user_id: number;
  shipping_address: string;
  total_amount: string;
  created_at: Date;
  updated_at: Date;

  constructor(data: Partial<Order>) {
    this.order_id = data.order_id || 0;
    this.user_id = data.user_id || 0;
    this.shipping_address = data.shipping_address || "";
    this.total_amount = data.total_amount || "";
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || new Date();
  }
}
