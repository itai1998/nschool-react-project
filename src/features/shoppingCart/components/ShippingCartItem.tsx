import { useMutation, useQueries } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProduct } from "../../../api/productApi";
import styles from "../../../scss/ShippingCartItem.module.scss";
import { filter, map } from "lodash";
import type { LocalData } from "../types";
import { OrderItem } from "../../../model/orderItem";
import { createOrderItems } from "../../../api/orderItemApi";

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

  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    setSelectedProductIds((prev) => {
      const validProductIds = new Set(localData.map((item) => item.product_id));
      const next = new Set(
        [...prev].filter((productId) => validProductIds.has(productId))
      );
      return next.size === prev.size ? prev : next;
    });
  }, [localData]);

  const toggleSelection = (productId: number, checked: boolean) => {
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(productId);
      else next.delete(productId);
      return next;
    });
  };

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

  const { mutate: createOrderItemsMutation, isPending: isCreatingOrderItems } =
    useMutation({
      mutationFn: async (orderItems: OrderItem[]) => {
        const response = await createOrderItems(orderItems);
        return response.data;
      },
      onSuccess: () => {
        removeProductsFromCart(getOrderItems().map((item) => item.product_id));
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

  const toggleAllSelection = () => {
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      if (next.size === shippingCartProducts.length) {
        next.clear();
      } else {
        shippingCartProducts.forEach((p) => next.add(p.product_id));
      }
      return next;
    });
  };

  const selectedProducts = shippingCartProducts.filter((p) =>
    selectedProductIds.has(p.product_id)
  );

  const handleDeleteItem = (product_id: number) => {
    const newLocalData = localData.filter(
      (item) => item.product_id !== product_id
    );
    localStorage.setItem("shoppingCart", JSON.stringify(newLocalData));
    setLocalData(newLocalData);
    setSelectedProductIds((prev) => {
      if (!prev.has(product_id)) return prev;
      const next = new Set(prev);
      next.delete(product_id);
      return next;
    });
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

  const getOrderItems = () =>
    selectedProducts.map(
      (item) =>
        new OrderItem({
          order_id: 1,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.price.toString(),
        })
    );

  const handleCheckout = () => {
    const orderItems = getOrderItems();
    createOrderItemsMutation(orderItems);
  };

  const removeProductsFromCart = (productIdsArray: number[]) => {
    const cart = JSON.parse(localStorage.getItem("shoppingCart") || "[]");

    const updatedCart = cart.filter(
      (item: LocalData) => !productIdsArray.includes(item.product_id)
    );

    localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
    setLocalData(updatedCart);
    setSelectedProductIds((prev) => {
      const next = new Set(prev);
      productIdsArray.forEach((productId) => next.delete(productId));
      return next.size === prev.size ? prev : next;
    });
  };

  if (isCreatingOrderItems) {
    return <div>Adding order item...</div>;
  }

  return (
    <div className={styles.shippingCartItemContainer}>
      <div className={styles.cartHeader}>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <div className={styles.ellipsisContainer}>
              <span className={styles.productName}>Product Name</span>
            </div>
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
          <span className={styles.productName}>全選 (0)</span>
        </div>
        <div className={styles.checkoutInfoContainer}>
          <div>總金額 (0 件商品)： $ 0</div>
          <div className={styles.checkoutButtonContainer}>
            <button
              disabled={selectedProductIds.size === 0}
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
