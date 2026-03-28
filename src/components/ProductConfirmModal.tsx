import Modal from "./Modal";
import styles from "../scss/ProductConfirmModal.module.scss";

interface ProductConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productPrice: string;
}

export default function ProductConfirmModal({
  isOpen,
  onClose,
  productId,
  productName,
  productPrice,
}: ProductConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.container}>
        {/* 產品ID will be remove from UI after testing */}
        <h3>Product ID: {productId}</h3>
        <h1>{productName}</h1>
        <h4>產品價格: NT$ {productPrice}</h4>
        <div className={styles.productQuantityContainer}>
          <h4>數量:</h4>
          <div className={styles.productQuantity}>
            <button className={styles.productQuantityOperation}>-</button>
            <button className={styles.productQuantityNumber}>1</button>
            <button className={styles.productQuantityOperation}>+</button>
          </div>
        </div>
        <button onClick={onClose} className={styles.addToCartButton}>
          加入購物車
        </button>
      </div>
    </Modal>
  );
}
