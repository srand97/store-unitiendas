import { useAlertStore } from "@/store/alertStore";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { useState, useCallback } from "react";

const baseURL = import.meta.env.VITE_UT_API_URL as string;

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | undefined;

interface FetchParams<TBody> {
  endpoint: string;
  method?: FetchMethod;
  formdata?: boolean;
  body?: TBody;
  isLoading?: boolean;
  signal?: any;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  results?: T | null;
  data?: T | null;
  count?: number | null;
  total_pages?: number | null;
  next?: string | null;
  errors?: string | Record<string, string[]> | null;
  error?: string | Record<string, any>;
  // Detalles de validación específicos del backend
  error_details?: any;
}

export const useFetch = <T, TBody = {}>() => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlertStore();
  const { showLoader, hideLoader } = useLoadingStore();
  const { user, logout } = useAuthStore();
  const token = user?.token;

  const fetchData = useCallback(
    async ({
      endpoint,
      method = "GET",
      body,
      formdata = false,
      isLoading = false,
    }: FetchParams<TBody>) => {
      setLoading(true);
      setError(null);
      if (isLoading) showLoader();
      try {
        const headers: Record<string, string> = formdata
          ? {}
          : { "Content-Type": "application/json", Accept: "application/json" };

        if (token) headers.Authorization = `Bearer ${token}`;
        let formattedBody: BodyInit | null = null;
        if (body) {
          if (formdata && body instanceof FormData) {
            formattedBody = body;
          } else if (!formdata) {
            formattedBody = JSON.stringify(body);
          } else {
            throw new Error("El body debe ser FormData cuando formdata=true.");
          }
        }

        const response = await fetch(`${baseURL}/v1/${endpoint}`, {
          method,
          headers,
          body: formattedBody,
        });

        if (response.status === 404) {
          //navigate("/404");
          return {
            success: false,
            status: 404,
            message: "No se encontró el recurso",
            next: null,
            data: null as T,
          } as ApiResponse<T>;
        }

        const data = await response.json();

        if (data?.code === "token_not_valid") {
          showAlert({
            type: "error",
            title: "Sesión expirada",
            message: "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.",
          });
          logout();
          return {
            success: false,
            status: 401,
            message: "Sesión expirada",
            next: null,
            data: null,
          } as ApiResponse<T>;
        }
        if (!response.ok) {
          // Propagar el payload del backend para que los consumidores manejen errores específicos
          return {
            success: false,
            status: response.status,
            message: data?.message || `Error: ${response.status}`,
            results: null,
            data: null,
            count: null,
            total_pages: null,
            next: null,
            errors: data?.errors ?? null,
            error: data?.error,
            // Incluye detalles específicos cuando el backend los envía
            error_details: data?.error_details,
          } as ApiResponse<T>;
        }
        return data as ApiResponse<T>;
      } catch (err: any) {
        const errorMessage = err.message || "Error desconocido en la petición";
        setError(errorMessage);
        return {
          success: false,
          status: 500,
          message: errorMessage,
          results: null,
          data: null,
          count: null,
          total_pages: null,
          next: null,
          errors: null,
          error: null,
          error_details: null,
        };
      } finally {
        setLoading(false);
        hideLoader();
      }
    },
    [token]
  );

  return { fetchData, loading, error };
};
