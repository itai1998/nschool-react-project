import type { Product } from "../model/product";
import styles from "../scss/Search.module.scss";

interface AvailableProductsProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export default function AvailableProducts({
  products,
  onOpenModal,
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
              <button
                className={styles.addToCartButton}
                onClick={() => {
                  onOpenModal(item);
                }}
              >
                選購
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
