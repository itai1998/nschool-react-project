import { useQueries } from "@tanstack/react-query";
import { getProduct } from "../../../api/productApi";
import styles from "../../../scss/ShippingCartItem.module.scss";
import { filter, map } from "lodash";
import type { LocalData } from "../types";

interface SelectedProduct {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function ShippingCartItem() {
  const localData: LocalData[] = JSON.parse(
    localStorage.getItem("shoppingCart") || "[]"
  );

  const products = useQueries({
    queries: localData?.map((data) => ({
      queryKey: ["product", data.product_id],
      queryFn: async () => {
        const response = await getProduct(data.product_id);
        return response.data;
      },
      enabled: !!data.product_id,
    })),
  });

  const productsData = map(
    filter(products, (result) => result.isSuccess),
    (result) => result.data
  );

  const shippingCartProducts: SelectedProduct[] = map(productsData, (item) => {
    const quantity =
      localData.find((data) => data.product_id === item?.product_id)
        ?.quantity ?? 0;
    const price = Number(item?.price ?? 0);
    return {
      product_id: item?.product_id ?? 0,
      name: item?.name ?? "",
      price,
      quantity,
      total: price * quantity,
    };
  });

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
        {shippingCartProducts.map((item, index) => (
          <div className={styles.gridContainer} key={index}>
            <div className={styles.gridItem}>{item.name}</div>
            <div className={styles.gridItem}></div>
            <div className={styles.gridItem}>{item.price}</div>
            <div className={styles.gridItem}>{item.quantity}</div>
            <div className={styles.gridItem}>{item.total}</div>
            <div className={styles.gridItem}>
              <button className={styles.deleteButton}> Delete </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
