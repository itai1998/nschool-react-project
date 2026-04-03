import styles from "../../../scss/ShippingCartItem.module.scss";

export default function ShippingCartItem() {
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
      <div className={styles.cartHeader}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>Product Name</div>
          <div className={styles.gridItem}></div>
          <div className={styles.gridItem}>Product Price</div>
          <div className={styles.gridItem}>Product Quantity</div>
          <div className={styles.gridItem}>Product Total</div>
          <div className={styles.gridItem}>Product Actions</div>
        </div>
      </div>
      <div className={styles.cartBody}>
        {shippingCartItems.map((item, index) => (
          <div className={styles.gridContainer} key={index}>
            <div className={styles.gridItem}>{item.productName}</div>
            <div className={styles.gridItem}></div>
            <div className={styles.gridItem}>{item.price}</div>
            <div className={styles.gridItem}>{item.quantity}</div>
            <div className={styles.gridItem}>{item.total}</div>
            <div className={styles.gridItem}>{item.actions}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
