import { useFetch } from "@/hooks/useFetch";
import { useAlertStore } from "@/store/alertStore";
import { useEffect, useState } from "react";

// Interfaces más específicas
interface SelectOption {
  id: string | number;
  label: string;
  value?: string | number;
  disabled?: boolean;
}

interface UseFetchSelectsProps {
  endpoint: string;
  id?: string;
  label?: string;
  enabled?: boolean; // Para controlar cuándo ejecutar el fetch
  transformData?: (data: any[]) => SelectOption[]; // Para transformar la respuesta
}

interface UseFetchSelectsReturn {
  list: SelectOption[];
  loading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

export const useFetchSelects = ({
  endpoint,
  id = "id",
  label = "name",
  enabled = true,
  transformData,
}: UseFetchSelectsProps): UseFetchSelectsReturn => {
  const { fetchData, loading } = useFetch<any>();
  const { showAlert } = useAlertStore();

  const [list, setList] = useState<SelectOption[]>([]);
  const [isError, setIsError] = useState<boolean>(false);

  // Función para transformar datos por defecto
  const defaultTransformData = (data: any[]): SelectOption[] => {
    return data.map((item) => ({
      id: item[id],
      label: item[label],
      value: item[id],
      ...item, // Mantener propiedades originales
    }));
  };

  const fetchSelect = async (): Promise<void> => {
    if (!enabled) return;
    setIsError(false);
    try {
      const response = await fetchData({ endpoint });

      // Usar transformación personalizada o la por defecto
      const transformedData = transformData
        ? transformData(response.data)
        : defaultTransformData(response.data);

      setList(transformedData);
    } catch (error) {
      setIsError(true);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido en la petición";

      showAlert({
        type: "error",
        title: "Error",
        message: errorMessage,
        duration: 10000,
      });
    }
  };

  const refetch = async (): Promise<void> => {
    await fetchSelect();
  };

  useEffect(() => {
    fetchSelect();
  }, [endpoint, enabled]); // Re-ejecutar cuando cambien estas dependencias

  return {
    list,
    loading,
    isError,
    refetch,
  };
};
