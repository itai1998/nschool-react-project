import { useEffect, useState } from "react";
import type {
  LocalData,
  SelectedProduct,
} from "../features/shoppingCart/types";
import { useMutation, useQueries } from "@tanstack/react-query";
import { getProduct } from "../api/productApi";
import { OrderItem } from "../model/orderItem";
import { createOrder, type CheckoutData } from "../api/orderApi";

const CART_KEY = "shoppingCart";

export const useShoppingCart = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };
  const [localData, setLocalData] = useState<LocalData[]>(() =>
    JSON.parse(localStorage.getItem(CART_KEY) || "[]")
  );

  const [selectedProductIds, setSelectedProductIds] = useState<Set<number>>(
    new Set()
  );

  const persistCart = (newData: LocalData[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(newData));
    setLocalData(newData);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Remove stale selections when items are deleted from the cart
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

  const productsData = useQueries({
    queries: localData?.map((data) => ({
      queryKey: ["localStorageProduct", data.product_id],
      queryFn: async () => {
        const response = await getProduct(data.product_id);
        return response.data;
      },
      enabled: !!data.product_id,
    })),
    combine: (results) =>
      results.filter((result) => result.isSuccess).map((result) => result.data),
  });

  const shippingCartProducts: SelectedProduct[] = productsData.map((item) => {
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

  const isAllSelected =
    shippingCartProducts.length > 0 &&
    selectedProductIds.size === shippingCartProducts.length;

  const toggleAllSelection = () => {
    setSelectedProductIds(
      isAllSelected
        ? new Set()
        : new Set(shippingCartProducts.map((p) => p.product_id))
    );
  };

  const selectedProducts = shippingCartProducts.filter((p) =>
    selectedProductIds.has(p.product_id)
  );

  const totalQuantity = localData.reduce((acc, item) => acc + item.quantity, 0);

  const { totalSelectedQuantity, totalSelectedPrice } = selectedProducts.reduce(
    (acc, item) => ({
      totalSelectedQuantity: acc.totalSelectedQuantity + item.quantity,
      totalSelectedPrice: acc.totalSelectedPrice + item.total,
    }),
    { totalSelectedQuantity: 0, totalSelectedPrice: 0 }
  );

  const handleDeleteItem = (product_id: number) => {
    persistCart(localData.filter((item) => item.product_id !== product_id));
    setSelectedProductIds((prev) => {
      if (!prev.has(product_id)) return prev;
      const next = new Set(prev);
      next.delete(product_id);
      return next;
    });
  };

  const handleQuantityChange = (product_id: number, quantity: number) => {
    const clamped = Math.max(1, quantity);
    persistCart(
      localData.map((item) =>
        item.product_id === product_id ? { ...item, quantity: clamped } : item
      )
    );
  };

  const handleQuantityIncrease = (product_id: number) => {
    persistCart(
      localData.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleQuantityDecrease = (product_id: number) => {
    persistCart(
      localData.map((item) =>
        item.product_id === product_id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeProductsFromCart = (productIdsArray: number[]) => {
    const updatedCart = localData.filter(
      (item) => !productIdsArray.includes(item.product_id)
    );
    persistCart(updatedCart);
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
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: item.price,
        })
    );

  const getCheckoutData = () => ({
    user_id: 1,
    shipping_address: "123 Main St, Anytown, USA",
    total_amount: totalSelectedPrice,
    items: getOrderItems(),
  });

  const { mutate: createOrderItemsMutation, isPending: isCreatingOrderItems } =
    useMutation({
      mutationFn: async (checkoutData: CheckoutData) => {
        const response = await createOrder(checkoutData);
        return response.data;
      },
      onSuccess: (_, checkoutData) => {
        removeProductsFromCart(
          checkoutData.items.map((item) => item.product_id)
        );
        setIsSuccessModalOpen(true);
      },
      onError: (error) => {
        console.error("Error adding order item:", error);
      },
    });

  const handleCheckout = () => {
    createOrderItemsMutation(getCheckoutData());
  };

  return {
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
    totalQuantity,
  };
};
