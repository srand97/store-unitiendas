import { useFetch } from "@/hooks/useFetch";
import { ENDPOINTS } from "@/utils/endpoints";
import { useCallback, useEffect, useState } from "react";
import { ResponseProducts } from "../types/typesProducts";

export const useProducts = (initialId?: string) => {
  const { fetchData, loading } = useFetch();
  const [listProducts, setListProducts] = useState<ResponseProducts>();
  const [listProduct, setListProduct] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  const getProducts = useCallback(async () => {
    try {
      setError(null);
      const response = await fetchData({
        endpoint: ENDPOINTS.products,
      });

      if (response.success && response.data) {
        setListProducts(response as any);
      } else {
        setListProducts([] as any);
        setError(response.message || "Failed to fetch products");
      }
    } catch (error) {
      setListProducts([] as any);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    }
  }, [fetchData]);

  const getProductById = useCallback(
    async (id: string) => {
      try {
        setError(null);
        const response = await fetchData({
          endpoint: `${ENDPOINTS.productById}${id}`,
        });

        if (response.success && response.data) {
          setListProduct(response.data as any);
        } else {
          setListProduct(null);
          setError(response.message || "Failed to fetch product");
        }
      } catch (error) {
        setListProduct(null);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    },
    [fetchData]
  );

  const refetch = useCallback(() => {
    if (initialId) {
      getProductById(initialId);
    } else {
      getProducts();
    }
  }, [getProducts, getProductById, initialId]);

  useEffect(() => {
    if (initialId) {
      getProductById(initialId);
    } else {
      getProducts();
    }
  }, [getProducts, getProductById, initialId]);

  return {
    listProducts,
    loading,
    error,
    refetch,
    isEmpty: listProducts?.data?.length === 0,
    listProduct,
  };
};
