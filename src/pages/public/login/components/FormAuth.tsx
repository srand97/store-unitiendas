import { Box, Input, Link, Typography } from "@mui/material";

// IMPORTADOS
// import IconGoogle from "@/assets/icon/IconGoogle";
import { MainButton } from "@/components/mainButton/MainButton";
import "./formAuth.scss";
import { useForm } from "react-hook-form";
// import { useLogin } from "../hook/useLogin";
import { useAuthStore } from "@/store/authStore";
// import { User } from "@/interfaces/user";
// import { useAlertStore } from "@/store/alertStore";
import { state } from "../Login";
import { useState } from "react";

interface FormAuthProps {
  setActions: (value: state) => void;
}

interface AuthFormData {
  username: string;
  password: string;
}

const FormAuth = ({ setActions }: FormAuthProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<AuthFormData>({
    mode: "onChange",
  });

  // const { login, loading } = useLogin();
  // const { showAlert } = useAlertStore();
  const { login: loginStore } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleRegisterClick = () => {
    setActions("register");
  };

  // const onSubmit = async (data: AuthFormData) => {
  //   const isValid = await trigger(["username", "password"]);
  //   if (isValid) {
  //     const response = await login(data);
  //     if (response?.success) {
  //       const user: User = response.data;
  //       loginStore(user);
  //     } else {
  //       showAlert({
  //         type: "error",
  //         title: "Error",
  //         message: response?.message || "Error al iniciar sesión",
  //         duration: 10000,
  //       });
  //     }
  //   }
  // };
  const onSubmit = async () => {
    setLoading(true);
    const isValid = await trigger(["username", "password"]);
    setTimeout(() => {
      if (isValid) {
        const response = {
          success: true,
          token: true,
        };
        if (response?.success) {
          const user: any = response;
          loginStore(user);
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography className="size20 fontOnestSemiBold" mb={3} ml={2}>
        Iniciar sesión
      </Typography>
      <form className="formAuth" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <Typography className="size16 fontOnest" mb={1} ml={2}>
            Email o número de teléfono
          </Typography>
          <Input
            placeholder="Email o número de teléfono"
            className="input"
            {...register("username", {
              required: "El email o número de teléfono es obligatorio",
            })}
            error={!!errors.username}
          />
          {errors.username && (
            <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
              {errors.username.message}
            </Typography>
          )}
        </section>

        <section>
          <Typography className="size16 fontOnest" mb={1} ml={2}>
            Contraseña
          </Typography>
          <Input
            placeholder="Contraseña"
            type="password"
            className="input"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            error={!!errors.password}
          />
          {errors.password && (
            <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
              {errors.password.message}
            </Typography>
          )}
        </section>

        <Box mt={1} className="formAuth__buttons">
          <MainButton
            className="btnRed size16 fontOnest"
            text={loading ? "Cargando..." : "Iniciar sesión"}
            type="submit"
          />
          <MainButton
            className="btnSimple size16 fontOnest"
            onClick={handleRegisterClick}
            text="Registrarme"
          />
        </Box>
        <Box m={"20px 0"}>
          <Link href="#" className="size16 fontOnest" sx={{ color: "var(--colorBlack)" }}>
            Olvidé mi contraseña
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default FormAuth;
