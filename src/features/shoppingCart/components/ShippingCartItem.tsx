import { useMutation, useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { getProduct } from "../../../api/productApi";
import styles from "../../../scss/ShippingCartItem.module.scss";
import { filter, map } from "lodash";
import type { LocalData } from "../types";
import { OrderItem } from "../../../model/orderItem";
import { addOrderItem } from "../../../api/orderItemApi";

interface SelectedProduct {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function ShippingCartItem() {
  const [localData, setLocalData] = useState<LocalData[]>(() =>
    JSON.parse(localStorage.getItem("shoppingCart") || "[]")
  );

  const products = useQueries({
    queries: localData?.map((data) => ({
      queryKey: ["localStorageProduct", data.product_id],
      queryFn: async () => {
        const response = await getProduct(data.product_id);
        return response.data;
      },
      enabled: !!data.product_id,
    })),
  });

  const { mutate: addOrderItemMutation, isPending: isAddingOrderItem } =
    useMutation({
      mutationFn: async (orderItems: OrderItem) => {
        const response = await addOrderItem(orderItems);
        return response.data;
      },
      onSuccess: () => {
        console.log("Order item added successfully");
      },
      onError: (error) => {
        console.error("Error adding order item:", error);
      },
    });

  const productsData = map(
    filter(products, (result) => result.isSuccess),
    (result) => result.data
  );

  // put this in a state and make it outside the component
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

  const handleDeleteItem = (product_id: number) => {
    const newLocalData = localData.filter(
      (item) => item.product_id !== product_id
    );
    localStorage.setItem("shoppingCart", JSON.stringify(newLocalData));
    setLocalData(newLocalData);
  };

  const handleQuantityChange = (product_id: number, quantity: number) => {
    const clamped = Math.max(1, quantity);
    const newLocalData = localData.map((item) =>
      item.product_id === product_id ? { ...item, quantity: clamped } : item
    );
    localStorage.setItem("shoppingCart", JSON.stringify(newLocalData));
    setLocalData(newLocalData);
  };

  const handleQuantityIncrease = (product_id: number) => {
    const newLocalData = localData.map((item) =>
      item.product_id === product_id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem("shoppingCart", JSON.stringify(newLocalData));
    setLocalData(newLocalData);
  };

  const handleQuantityDecrease = (product_id: number) => {
    const newLocalData = localData.map((item) =>
      item.product_id === product_id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    localStorage.setItem("shoppingCart", JSON.stringify(newLocalData));
    setLocalData(newLocalData);
  };

  const handleCheckout = () => {
    const orderItem = new OrderItem({
      order_id: 1,
      product_id: shippingCartProducts[0].product_id,
      quantity: shippingCartProducts[0].quantity,
      unit_price: shippingCartProducts[0].price.toString(),
    });
    addOrderItemMutation(orderItem);

    console.log("Checkout", orderItem);
  };

  if (isAddingOrderItem) {
    return <div>Adding order item...</div>;
  }

  return (
    <div className={styles.shippingCartItemContainer}>
      <div className={styles.cartHeader}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <span className={styles.cellEllipsis}>Product Name</span>
          </div>
          <div className={styles.gridItem}>Product Price</div>
          <div className={styles.gridItem}>Product Quantity</div>
          <div className={styles.gridItem}>Product Total</div>
          <div className={styles.gridItem}>Product Actions</div>
        </div>
      </div>
      <div className={styles.cartBody}>
        {shippingCartProducts.map((item, index) => (
          <div className={styles.gridContainer} key={index}>
            <div className={styles.gridItem} title={item.name}>
              <span className={styles.cellEllipsis}>{item.name}</span>
            </div>
            <div className={styles.gridItem}>{item.price}</div>
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
            <div className={styles.gridItem}>{item.total}</div>
            <div className={styles.gridItem}>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteItem(item.product_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
