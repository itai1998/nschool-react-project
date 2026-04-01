import styles from "../../../scss/ShippingCartItem.module.scss";

export default function ShippingCartItem() {
  return (
    <div className={styles.shippingCartItemContainer}>
      <div className={styles.cartGrid} role="table">
        <div className={styles.gridRow} role="row">
          <div className={styles.cell} role="columnheader">
            Product Name
          </div>
          <div className={styles.cell} role="columnheader" />
          <div className={styles.cell} role="columnheader">
            Product Price
          </div>
          <div className={styles.cell} role="columnheader">
            Product Quantity
          </div>
          <div className={styles.cell} role="columnheader">
            Product Total
          </div>
          <div className={styles.cell} role="columnheader">
            Product Actions
          </div>
        </div>
        <div className={styles.gridRow} role="row">
          <div className={styles.cell} role="cell">
            Name
          </div>
          <div className={styles.cell} role="cell" />
          <div className={styles.cell} role="cell">
            Price
          </div>
          <div className={styles.cell} role="cell">
            Quantity
          </div>
          <div className={styles.cell} role="cell">
            Total
          </div>
          <div className={styles.cell} role="cell">
            Actions
          </div>
        </div>
      </div>
    </div>
  );
}
