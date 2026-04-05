export class OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: string;

  constructor(data: Partial<OrderItem>) {
    this.order_id = data.order_id || 0;
    this.product_id = data.product_id || 0;
    this.quantity = data.quantity || 0;
    this.unit_price = data.unit_price || "";
  }
}
