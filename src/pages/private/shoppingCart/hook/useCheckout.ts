import { useFetch, type ApiResponse } from "@/hooks/useFetch";
import { useAlertStore } from "@/store/alertStore";
import { useCartStore } from "@/store/cartStore";
import { ENDPOINTS } from "@/utils/endpoints";

export type FulfillmentMethod = "delivery" | "pickup";

export interface CreateOrderValues {
  fulfillment_method: FulfillmentMethod;
  delivery_address?: string;
  delivery_phone?: string;
  notes?: string;
}

export interface OrderItemResponse {
  id: string;
  product: string | null;
  product_name: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
}

export interface OrderResponse {
  id: string;
  code: string;
  status: string;
  fulfillment_method: FulfillmentMethod;
  delivery_address: string | null;
  delivery_phone: string | null;
  total_amount: string;
  notes: string | null;
  items: OrderItemResponse[];
  created_at: string;
  paid_at: string | null;
}

export const useCheckout = () => {
  const { fetchData, loading } = useFetch<OrderResponse>();
  const { showAlert } = useAlertStore();
  const { products } = useCartStore();

  const createOrder = async (
    values: CreateOrderValues
  ): Promise<ApiResponse<OrderResponse> | undefined> => {
    if (products.length === 0) {
      showAlert({
        type: "warning",
        title: "Carrito vacío",
        message: "Agrega productos antes de continuar.",
      });
      return;
    }

    try {
      const response = await fetchData({
        endpoint: ENDPOINTS.billings.createOrder,
        method: "POST",
        isLoading: true,
        body: {
          ...values,
          // El precio NUNCA se envia: el backend lo recalcula desde el
          // producto para que nadie pueda manipular el total del pedido.
          items: products.map((p) => ({ product: p.id, quantity: p.quantity })),
        },
      });

      if (!response?.success) {
        showAlert({
          type: "error",
          title: "No se pudo crear el pedido",
          message: response?.message || "Intenta nuevamente.",
          duration: 8000,
        });
      }

      return response;
    } catch (error) {
      showAlert({
        type: "error",
        title: "Error",
        message: (error as string) || "Error desconocido al crear el pedido.",
        duration: 8000,
      });
    }
  };

  return { createOrder, loading };
};
