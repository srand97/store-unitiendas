import { MainButton } from "@/components/mainButton/MainButton";
import { identificationTypes } from "@/pages/public/login/components/FormRegister";
import { Box, Input, MenuItem, Select, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
// IMPORTADOS
import redLogo from "@/assets/images/redLogo.png";
interface RegisterFormData {
  name: string;
  last_name: string;
  email: string;
  identification_type: string;
  identification_number: string;
  phone_number: string;
  password: string;
  confirm_password: string;
}

const PreRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterFormData>({
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <img src={redLogo} />
      <Typography className="size20 fontOnestSemiBold" ml={2} mt={2}>
        Pre-registro
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} className="formRegister">
        <Fragment>
          <Box display={"flex"} width={"100%"} gap={1}>
            <section style={{ width: "100%" }}>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Nombres
              </Typography>
              <Input
                placeholder="Nombres"
                className="input"
                {...register("name", {
                  required: "Los nombres son obligatorios",
                  minLength: {
                    value: 2,
                    message: "Los nombres deben tener al menos 2 caracteres",
                  },
                })}
                error={!!errors.name}
              />
              {errors.name && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.name.message}
                </Typography>
              )}
            </section>
            <section style={{ width: "100%" }}>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Apellidos
              </Typography>
              <Input
                placeholder="Apellidos"
                className="input"
                {...register("last_name", {
                  required: "Los apellidos son obligatorios",
                  minLength: {
                    value: 2,
                    message: "Los apellidos deben tener al menos 2 caracteres",
                  },
                })}
                error={!!errors.last_name}
              />
              {errors.last_name && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.last_name.message}
                </Typography>
              )}
            </section>
          </Box>
          <Box display={"flex"} width={"100%"} gap={1}>
            <section style={{ width: "100%" }}>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Tipo de documento
              </Typography>
              <Controller
                name="identification_type"
                control={control}
                rules={{ required: "El tipo de documento es requerido" }}
                render={({ field, fieldState }) => (
                  <Select
                    {...field}
                    className={`${!field.value ? "placeholderSelect" : ""} select`}
                    error={!!fieldState.error}
                    value={field.value || ""}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Selecciona una opción
                    </MenuItem>
                    {identificationTypes?.map((element) => (
                      <MenuItem value={element.value} key={element.id}>
                        {element.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.identification_type && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.identification_type.message}
                </Typography>
              )}
            </section>
            <section style={{ width: "100%" }}>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Número de documento
              </Typography>
              <Input
                placeholder="Número de documento"
                className="input"
                {...register("identification_number", {
                  required: "El número de documento es obligatorio",
                  minLength: {
                    value: 8,
                    message: "El número de documento deben tener al menos 8 dígitos",
                  },
                  deps: "identification_type",
                })}
                onKeyDown={(e) => {
                  // Prevenir que se escriba el signo negativo
                  if (e.key === "-" || e.key === "e" || e.key === "E") {
                    e.preventDefault();
                  }
                }}
                type="number"
                error={!!errors.identification_number}
              />
              {errors.identification_number && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.identification_number.message}
                </Typography>
              )}
            </section>
          </Box>
          <section>
            <Typography className="size16 fontOnest" mb={1} ml={2}>
              Email
            </Typography>
            <Input
              placeholder="Ejemplo@dominio.com"
              className="input"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El email no es válido",
                },
              })}
              error={!!errors.email}
            />
            {errors.email && (
              <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                {errors.email.message}
              </Typography>
            )}
          </section>
        </Fragment>

        <Fragment>
          <section>
            <Typography className="size16 fontOnest" mb={1} ml={2}>
              Número de teléfono
            </Typography>
            <Input
              placeholder="Número de teléfono"
              className="input"
              {...register("phone_number", {
                required: "El número de teléfono es obligatorio",
                minLength: {
                  value: 10,
                  message: "El número de teléfono debe tener al menos 10 caracteres",
                },
              })}
              error={!!errors.phone_number}
            />
            {errors.phone_number && (
              <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                {errors.phone_number.message}
              </Typography>
            )}
          </section>
        </Fragment>

        <Box
          m={"20px 0"}
          className="formAuth__buttons"
          sx={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}
        >
          <Typography>
            El pre-registro está sujeto a aprobación, recibirás la confirmación al correo ingresado.
          </Typography>
          <MainButton
            className="btnRed size16 fontOnest"
            type="submit"
            text={`${false ? "Cargando..." : "Registrar"}`}
          />
        </Box>
      </form>
    </Box>
  );
};

export default PreRegistration;
