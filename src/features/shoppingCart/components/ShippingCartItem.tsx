import styles from "../../../scss/ShippingCartItem.module.scss";
import { useShoppingCart } from "../../../hooks/useShoppingCart";
import SuccessModal from "../../../components/SuccessModal";
import { formatTWD } from "../../../utils";

export default function ShippingCartItem() {
  const {
    shippingCartProducts,
    selectedProductIds,
    totalSelectedQuantity,
    totalSelectedPrice,
    isCreatingOrderItems,
    toggleSelection,
    toggleAllSelection,
    handleDeleteItem,
    handleQuantityChange,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleCheckout,
    isSuccessModalOpen,
    handleCloseSuccessModal,
  } = useShoppingCart();

  if (isCreatingOrderItems) {
    return <div>Adding order item...</div>;
  }

  return (
    <div className={styles.shippingCartItemContainer}>
      <div className={styles.cartHeader}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <div className={styles.ellipsisContainer}>
              <span className={styles.productName}>商品</span>
            </div>
          </div>
          <div className={styles.gridItem}>價格</div>
          <div className={styles.gridItem}>數量</div>
          <div className={styles.gridItem}>總價</div>
          <div className={styles.gridItem}></div>
        </div>
      </div>
      <div className={styles.cartBody}>
        {shippingCartProducts.map((item, index) => (
          <div className={styles.gridContainer} key={index}>
            <div className={styles.gridItem} title={item.name}>
              <div className={styles.ellipsisContainer}>
                <input
                  type="checkbox"
                  checked={selectedProductIds.has(item.product_id)}
                  onChange={(e) =>
                    toggleSelection(item.product_id, e.target.checked)
                  }
                />
                <span className={styles.productName}>{item.name}</span>
              </div>
            </div>
            <div className={styles.gridItem}>{formatTWD(item.price)}</div>
            <div className={styles.gridItem}>
              <div className={styles.productQuantityContainer}>
                <div className={styles.productQuantity}>
                  <button
                    className={styles.productQuantityOperation}
                    onClick={() => handleQuantityDecrease(item.product_id)}
                  >
                    -
                  </button>

                  <input
                    className={styles.productQuantityNumber}
                    value={item.quantity}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) {
                        return;
                      }
                      handleQuantityChange(
                        item.product_id,
                        Number(e.target.value)
                      );
                    }}
                  />
                  <button
                    className={styles.productQuantityOperation}
                    onClick={() => handleQuantityIncrease(item.product_id)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.gridItem}>{formatTWD(item.total)}</div>
            <div className={styles.gridItem}>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteItem(item.product_id)}
              >
                移除購物車
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.selectAllContainer}>
          <input
            type="checkbox"
            checked={
              selectedProductIds.size > 0 &&
              selectedProductIds.size === shippingCartProducts.length
            }
            onChange={toggleAllSelection}
          />
          <span className={styles.productName}>
            全選 ({selectedProductIds.size})
          </span>
        </div>
        <div className={styles.checkoutInfoContainer}>
          <div>
            總金額 ({totalSelectedQuantity} 件商品)： $ {totalSelectedPrice}
          </div>
          <div className={styles.checkoutButtonContainer}>
            <button
              disabled={selectedProductIds.size === 0}
              onClick={handleCheckout}
            >
              去買單
            </button>
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </div>
  );
}
