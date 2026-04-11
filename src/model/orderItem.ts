export class OrderItem {
  product_id: number;
  quantity: number;
  unit_price: number;

  constructor(data: Partial<OrderItem>) {
    this.product_id = data.product_id || 0;
    this.quantity = data.quantity || 0;
    this.unit_price = data.unit_price || 0;
  }
}
