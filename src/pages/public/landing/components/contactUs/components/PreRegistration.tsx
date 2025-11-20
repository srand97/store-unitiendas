import { Box, Typography } from "@mui/material";
// IMPORTADOS
import RedLogo from "@/assets/images/redLogo.png";

const PreRegistration = () => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Typography className="size20 fontOnestSemiBold" ml={2}>
        Registro
      </Typography>

      {/* LINE */}
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "var(--colorGray)" }}>
        <Box className="progress__line" sx={{ width: step === 1 ? "50%" : "100%" }} />
      </Box>
      <form onSubmit={handleSubmit(onSubmit)} className="formRegister">
        {/* STEP 1 */}
        {step === 1 && (
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
        )}

        {/* STEP 2 */}
        {step === 2 && (
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
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres",
                  },
                })}
                error={!!errors.password}
              />
              {errors.password && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.password.message}
                </Typography>
              )}
            </section>
            <section>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Confirmar Contraseña
              </Typography>
              <Input
                placeholder="Confirmar Contraseña"
                type="password"
                className="input"
                {...register("confirm_password", {
                  required: "Confirma tu contraseña",
                  validate: (value) => value === watchPassword || "Las contraseñas no coinciden",
                })}
                error={!!errors.confirm_password}
              />
              {errors.confirm_password && (
                <Typography color="error" className="size12 fontOnest" mt={0.5} ml={2}>
                  {errors.confirm_password.message}
                </Typography>
              )}
            </section>
          </Fragment>
        )}

        <Box m={"20px 0"} className="formAuth__buttons">
          <MainButton
            className="btnSimple size16 fontOnest"
            text="Iniciar sesión"
            onClick={() => setActions("auth")}
          />
          {step > 1 && (
            <MainButton
              className="btnRed size16 fontOnest"
              onClick={handlePreviousClick}
              text=""
              iconLeft={<IconArrowLeft color="#fff" height={20} width={20} />}
            />
          )}
          <MainButton
            className="btnRed size16 fontOnest"
            onClick={step === 2 ? () => undefined : handleNextClick}
            type={step === 2 ? "submit" : "button"}
            text={step === 2 ? `${loading ? "Cargando..." : "Registrar"}` : "Siguiente"}
          />
        </Box>
      </form>
    </Box>
  );
};

export default PreRegistration;
