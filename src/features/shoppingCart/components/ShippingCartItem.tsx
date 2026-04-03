import styles from "../../../scss/ShippingCartItem.module.scss";

export default function ShippingCartItem() {
  const data = [
    { name: "John Doe", age: 28, role: "Developer" },
    { name: "Mary Jane", age: 32, role: "Designer" },
  ];

  const shippingCartItems = [
    {
      productName: 1,
      price: 2500,
      quantity: 12,
      total: 100,
      actions: "Delete",
    },
    {
      productName: 2,
      price: 3000,
      quantity: 10,
      total: 100,
      actions: "Delete",
    },
    { productName: 3, price: 3500, quantity: 8, total: 100, actions: "Delete" },
    { productName: 4, price: 4000, quantity: 6, total: 100, actions: "Delete" },
    { productName: 5, price: 4500, quantity: 4, total: 100, actions: "Delete" },
    { productName: 6, price: 5000, quantity: 2, total: 100, actions: "Delete" },
    { productName: 7, price: 5500, quantity: 0, total: 100, actions: "Delete" },
  ];

  return (
    <div className={styles.shippingCartItemContainer}>
      <table>
        <colgroup>
          <col style={{ width: "50%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "25%" }} />
        </colgroup>

        <thead>
          <tr>
            <th>Product Name</th>
            <th></th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Product Total</th>
            <th>Product Actions</th>
          </tr>
        </thead>

        <tbody>
          {shippingCartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td></td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.total}</td>
              <td>{item.actions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
