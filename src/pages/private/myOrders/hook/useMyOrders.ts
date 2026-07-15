import { useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/utils/endpoints";
import type { OrderResponse } from "../../shoppingCart/hook/useCheckout";

export const useMyOrders = () => {
  const { fetchData, loading, error } = useFetch<OrderResponse[]>();
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  const fetchOrders = async () => {
    const response = await fetchData({
      endpoint: ENDPOINTS.billings.myOrders,
      method: "GET",
    });
    if (response?.success && response.data) {
      setOrders(response.data as unknown as OrderResponse[]);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { orders, loading, error, refetch: fetchOrders };
};
