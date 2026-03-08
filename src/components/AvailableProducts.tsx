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
            <h2>{item.name}</h2>
            <h3>{item.price}</h3>
            <h4>{item.category}</h4>
          </div>
        ))
      ) : products.length === 0 ? null : (
        <p>No products found</p>
      )}
    </div>
  );
}
