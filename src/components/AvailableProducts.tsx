import type { Product } from "../model/product";
import styles from "../scss/Search.module.scss";

interface AvailableProductsProps {
  products: Product[];
}

export default function AvailableProducts({
  products,
}: AvailableProductsProps) {
  return (
    <div className={styles.flexContainer}>
      {products.length > 0 ? (
        products.map((item) => (
          <div key={item.name} className={styles.productBox}>
            <div className={styles.productInfo}>
              <h2>{item.name}</h2>
              <h3>{item.price}</h3>
              <h4>{item.category}</h4>
            </div>
            <div className={styles.productAction}>
              <div className={styles.productQuantityContainer}>
                <h4>Quantity:</h4>
                <div className={styles.productQuantity}>
                  <button className={styles.productQuantityOperation}>-</button>
                  <button className={styles.productQuantityNumber}>1</button>
                  <button className={styles.productQuantityOperation}>+</button>
                </div>
              </div>
              <button
                className={styles.addToCartButton}
                onClick={() => {
                  console.log(`${item.product_id} added to cart`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : products.length === 0 ? null : (
        <p>No products found</p>
      )}
    </div>
  );
}
