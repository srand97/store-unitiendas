// src/pages/shoppingCart/components/PaymentForm.tsx
import { Box, Input, MenuItem, Select, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { MainButton } from "@/components/mainButton/MainButton";
import { ENDPOINTS } from "@/utils/endpoints";
import { useFetchSelects } from "@/pages/public/login/hook/useFetchSelects";

interface PaymentFormData {
  // Pago y entrega
  formaPago: string;
  tipoEntrega: string;
  puntoEntrega: string;
  // Datos personales
  nombres: string;
  apellidos: string;
  tipoDocumento: string;
  numeroDocumento: string;
  correo: string;
  telefono: string;
  // Datos de entrega
  nombreTienda: string;
  departamento: string;
  municipio: string;
  barrio: string;
  direccion: string;
  indicaciones: string;
}

interface PaymentFormProps {
  onContinue: () => void;
  onBack: () => void;
}

const PaymentForm = ({ onContinue, onBack }: PaymentFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    trigger,
  } = useForm<PaymentFormData>({
    mode: "onChange",
    defaultValues: {
      formaPago: "",
      tipoEntrega: "",
      puntoEntrega: "",
      tipoDocumento: "",
      departamento: "atlantico",
      municipio: "",
      barrio: "",
    },
  });

  const { list: identificationTypes } = useFetchSelects({
    endpoint: ENDPOINTS.utils.identification_type,
    transformData: (data) =>
      data?.map((item) => ({
        id: item?.id,
        label: item?.name,
        value: item?.code,
      })),
  });

  const tipoEntrega = watch("tipoEntrega");

  const onSubmit = async (data: PaymentFormData) => {
    const isValid = await trigger();
    if (isValid) {
      console.log("Formulario paso 3:", data);
      onContinue();
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ── PAGO Y ENTREGA ── */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            mb: 3,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3} mb={2}>
            {/* Forma de pago */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Forma de pago
              </Typography>
              <Controller
                name="formaPago"
                control={control}
                rules={{ required: "Selecciona una forma de pago" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    className={`${!field.value ? "placeholderSelect" : ""} select`}
                  >
                    <MenuItem value="" disabled>
                      Selecciona
                    </MenuItem>
                    <MenuItem value="pse">PSE</MenuItem>
                    <MenuItem value="tarjeta">Tarjeta crédito/débito</MenuItem>
                    <MenuItem value="efectivo">Efectivo</MenuItem>
                    <MenuItem value="nequi">Nequi</MenuItem>
                  </Select>
                )}
              />
              {errors.formaPago && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.formaPago.message}
                </Typography>
              )}
            </Box>

            {/* Tipo de entrega */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Tipo de entrega
              </Typography>
              <Controller
                name="tipoEntrega"
                control={control}
                rules={{ required: "Selecciona un tipo de entrega" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    className={`${!field.value ? "placeholderSelect" : ""} select`}
                  >
                    <MenuItem value="" disabled>
                      Selecciona
                    </MenuItem>
                    <MenuItem value="punto">Recoger en punto físico</MenuItem>
                    <MenuItem value="domicilio">Domicilio</MenuItem>
                  </Select>
                )}
              />
              {errors.tipoEntrega && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.tipoEntrega.message}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Punto de entrega — solo si eligió punto físico */}
          {tipoEntrega === "punto" && (
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Punto de entrega
              </Typography>
              <Controller
                name="puntoEntrega"
                control={control}
                rules={{ required: "Selecciona un punto de entrega" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{ maxWidth: { md: "calc(50% - 12px)" } }}
                    className={`${!field.value ? "placeholderSelect" : ""} select`}
                  >
                    <MenuItem value="" disabled>
                      Selecciona
                    </MenuItem>
                    <MenuItem value="calle17">Calle 17 #13-123</MenuItem>
                    <MenuItem value="carrera9">Carrera 9 #45-67</MenuItem>
                  </Select>
                )}
              />
              {errors.puntoEntrega && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.puntoEntrega.message}
                </Typography>
              )}
              <Typography
                className="size12 fontOnestSemiBold"
                mt={1}
                sx={{ color: "var(--colorRed, #e53935)" }}
              >
                Tu pedido puede ser recogido a más tardar 5 días hábiles
              </Typography>
            </Box>
          )}
        </Box>

        {/* ── DATOS PERSONALES ── */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            p: { xs: 2, md: 3 },
            mb: 3,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}
        >
          <Typography className="size20 fontOnestBold" mb={3}>
            Datos personales
          </Typography>

          <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
            {/* Nombres */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Nombres
              </Typography>
              <Input
                placeholder="Escriba sus nombres"
                {...register("nombres", { required: "El nombre es obligatorio" })}
                error={!!errors.nombres}
                className="input"
              />
              {errors.nombres && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.nombres.message}
                </Typography>
              )}
            </Box>

            {/* Apellidos */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Apellidos
              </Typography>
              <Input
                placeholder="Escriba sus apellidos"
                {...register("apellidos", { required: "El apellido es obligatorio" })}
                error={!!errors.apellidos}
                className="input"
              />
              {errors.apellidos && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.apellidos.message}
                </Typography>
              )}
            </Box>

            {/* Tipo de documento */}
            <Box>
              <Typography className="size16 fontOnest" mb={1} ml={2}>
                Tipo de documento
              </Typography>
              <Controller
                name="tipoDocumento"
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
              {errors.tipoDocumento && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.tipoDocumento.message}
                </Typography>
              )}
            </Box>

            {/* Número de documento */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Número de documento
              </Typography>
              <Input
                placeholder="Escriba su número de documento"
                {...register("numeroDocumento", {
                  required: "El número de documento es obligatorio",
                  pattern: { value: /^[0-9]+$/, message: "Solo se permiten números" },
                })}
                error={!!errors.numeroDocumento}
                className="input"
              />
              {errors.numeroDocumento && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.numeroDocumento.message}
                </Typography>
              )}
            </Box>

            {/* Correo */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Correo electrónico
              </Typography>
              <Input
                placeholder="ejemplo@dominio.com"
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo inválido" },
                })}
                error={!!errors.correo}
                className="input"
              />
              {errors.correo && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.correo.message}
                </Typography>
              )}
            </Box>

            {/* Teléfono */}
            <Box>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Teléfono
              </Typography>
              <Input
                placeholder="Escriba su número de telefono"
                {...register("telefono", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Ingresa un teléfono válido de 10 dígitos",
                  },
                })}
                error={!!errors.telefono}
                className="input"
              />
              {errors.telefono && (
                <Typography color="error" className="size12" mt={0.5} ml={1}>
                  {errors.telefono.message}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>

        {/* ── DATOS DE ENTREGA — solo si eligió domicilio ── */}
        {tipoEntrega === "domicilio" && (
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              mb: 3,
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <Typography className="size20 fontOnestBold" mb={3}>
              Datos de entrega
            </Typography>

            <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }} gap={3}>
              {/* Nombre de la tienda */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Nombre de la tienda
                </Typography>
                <Input
                  placeholder="Escriba el nombre de la tienda"
                  {...register("nombreTienda", {
                    required: "El nombre de la tienda es obligatorio",
                  })}
                  error={!!errors.nombreTienda}
                  className="input"
                />
                {errors.nombreTienda && (
                  <Typography color="error" className="size12" mt={0.5} ml={1}>
                    {errors.nombreTienda.message}
                  </Typography>
                )}
              </Box>

              {/* Departamento */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Departamento
                </Typography>
                <Controller
                  name="departamento"
                  control={control}
                  rules={{ required: "Selecciona un departamento" }}
                  render={({ field }) => (
                    <Select {...field} disabled className="select" value="atlantico">
                      <MenuItem value="atlantico">Atlántico</MenuItem>
                    </Select>
                  )}
                />
                {errors.departamento && (
                  <Typography color="error" className="size12" mt={0.5} ml={1}>
                    {errors.departamento.message}
                  </Typography>
                )}
              </Box>

              {/* Municipio */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Municipio
                </Typography>
                <Controller
                  name="municipio"
                  control={control}
                  rules={{ required: "Selecciona un municipio" }}
                  render={({ field }) => (
                    <Select {...field} displayEmpty className="select">
                      <MenuItem value="" disabled>
                        Selecciona
                      </MenuItem>
                      s<MenuItem value="soledad">Soledad</MenuItem>
                      <MenuItem value="barranquilla">Barranquilla</MenuItem>
                      <MenuItem value="malambo">Malambo</MenuItem>
                      <MenuItem value="galapa">Galapa</MenuItem>
                    </Select>
                  )}
                />
                {errors.municipio && (
                  <Typography color="error" className="size12" mt={0.5} ml={1}>
                    {errors.municipio.message}
                  </Typography>
                )}
              </Box>

              {/* Barrio */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Barrio
                </Typography>
                <Input
                  placeholder="Escriba el nombre de el barrio"
                  {...register("barrio", {
                    required: "El barrio es obligatorio",
                  })}
                  error={!!errors.barrio}
                  className="input"
                />
                {errors.barrio && (
                  <Typography color="error" className="size12" mt={0.5} ml={1}>
                    {errors.barrio.message}
                  </Typography>
                )}
              </Box>

              {/* Dirección */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Dirección
                </Typography>
                <Input
                  placeholder="Escriba su dirección"
                  {...register("direccion", { required: "La dirección es obligatoria" })}
                  error={!!errors.direccion}
                  className="input"
                />
                {errors.direccion && (
                  <Typography color="error" className="size12" mt={0.5} ml={1}>
                    {errors.direccion.message}
                  </Typography>
                )}
              </Box>

              {/* Indicaciones */}
              <Box>
                <Typography className="size14 fontOnestSemiBold" mb={1}>
                  Indicaciones
                </Typography>
                <Input
                  placeholder="Escriba un punto de referencia"
                  {...register("indicaciones")}
                  className="input"
                />
              </Box>
            </Box>
          </Box>
        )}

        {/* Botón confirmar */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <MainButton text="Atrás" className="btnRed" sx={{ px: 4, py: 1.2 }} onClick={onBack} />
          <MainButton
            type="submit"
            text="Confirmar y continuar"
            className="btnRed"
            sx={{ px: 4, py: 1.2 }}
          />
        </Box>
      </form>
    </Box>
  );
};

export default PaymentForm;
