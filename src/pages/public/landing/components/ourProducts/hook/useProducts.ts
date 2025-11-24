import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/utils/endpoints";
import { useCallback, useEffect, useState } from "react";
import { ResponseProducts } from "../types/typesProducts";
import { useAlertStore } from "@/store/alertStore";

export const useProducts = () => {
  const { fetchData } = useFetch();
  const { showAlert } = useAlertStore();
  const [listProducts, setListProducts] = useState<ResponseProducts>();

  const getProducts = useCallback(async () => {
    const response = await fetchData({
      endpoint: ENDPOINTS.products,
    });
    if (response.success) {
      setListProducts(response as any);
    } else {
      showAlert({
        type: "error",
        title: "Error",
        message: response.message,
      });
    }
  }, [fetchData]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    listProducts,
  };
};
