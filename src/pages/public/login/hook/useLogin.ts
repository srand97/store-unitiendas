import { useFetch } from "@/hooks/useFetch";
import { useAlertStore } from "@/store/alertStore";
import { ENDPOINTS } from "@/utils/endpoints";

interface LoginValues {
  username: string;
  password: string;
}

interface RegisterValues {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

export const useLogin = () => {
  const { fetchData, loading } = useFetch<any>();
  const { showAlert } = useAlertStore();

  const login = async (values: LoginValues) => {
    try {
      const response = await fetchData({
        endpoint: ENDPOINTS.accounts.login,
        method: "POST",
        body: values,
      });

      return response;
    } catch (error) {
      const errorMessage = error || "Error desconocido en la petición";
      showAlert({
        type: "error",
        title: "Error",
        message: errorMessage as string,
        duration: 10000,
      });
    }
  };

  const register = async (values: RegisterValues) => {
    try {
      const response = await fetchData({
        endpoint: ENDPOINTS.accounts.signup,
        method: "POST",
        body: values,
      });

      return response;
    } catch (error) {
      const errorMessage = error || "Error desconocido en la petición";
      showAlert({
        type: "error",
        title: "Error",
        message: errorMessage as string,
        duration: 10000,
      });
    }
  };

  return { login, register, loading };
};
