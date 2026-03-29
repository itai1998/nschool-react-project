import Modal from "./Modal";
import styles from "../scss/ProductConfirmModal.module.scss";
import { useState } from "react";

interface ProductConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  productPrice: string;
  onAddToCart: (productId: number, quantity: number) => void;
}

export default function ProductConfirmModal({
  isOpen,
  onClose,
  productId,
  productName,
  productPrice,
  onAddToCart,
}: ProductConfirmModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

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
            <button
              className={styles.productQuantityOperation}
              onClick={handleQuantityDecrease}
            >
              -
            </button>

            <input
              className={styles.productQuantityNumber}
              value={quantity}
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) {
                  return;
                }
                handleQuantityChange(Number(e.target.value));
              }}
            />
            <button
              className={styles.productQuantityOperation}
              onClick={handleQuantityIncrease}
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={() => onAddToCart(productId, quantity)}
          className={styles.addToCartButton}
        >
          加入購物車
        </button>
      </div>
    </Modal>
  );
}
