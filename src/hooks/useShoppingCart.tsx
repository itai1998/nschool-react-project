import { useEffect, useState } from "react";
import type { LocalData } from "../features/shoppingCart/types";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getProduct } from "../api/productApi";
import { OrderItem } from "../model/orderItem";
import { createOrderItems } from "../api/orderItemApi";
import { filter, map } from "lodash";

interface SelectedProduct {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export const useShoppingCart = () => {
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

  const totalQuantity = selectedProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = selectedProducts.reduce(
    (sum, item) => sum + item.total,
    0
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

  const handleCheckout = () => {
    createOrderItemsMutation(getOrderItems());
  };

  return {
    shippingCartProducts,
    selectedProductIds,
    totalQuantity,
    totalPrice,
    isCreatingOrderItems,
    toggleSelection,
    toggleAllSelection,
    handleDeleteItem,
    handleQuantityChange,
    handleQuantityIncrease,
    handleQuantityDecrease,
    handleCheckout,
  };
};
