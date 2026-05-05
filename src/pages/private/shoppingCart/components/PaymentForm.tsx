import { Box, MenuItem, Select, Typography, Grid, Input } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { MainButton } from "@/components/mainButton/MainButton";

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
  } = useForm<PaymentFormData>({
    mode: "onChange",
    defaultValues: {
      departamento: "atlantico",
      tipoEntrega: "",
      formaPago: "",
    },
  });

  const tipoEntrega = watch("tipoEntrega");

  const onSubmit = async (data: PaymentFormData) => {
    console.log(data);
    onContinue();
  };

  const sectionStyle = {
    bgcolor: "white",
    borderRadius: 4,
    p: { xs: 3, md: 4 },
    mb: 4,
    border: "1px solid var(--colorBlueLight)",
    transition: "all 0.3s ease",
    "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ── SECCIÓN 1: MÉTODO Y ENTREGA ── */}
        <Box sx={sectionStyle}>
          <Typography className="size20 fontOnestBold" mb={3}>
            Preferencias de pedido
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Forma de pago
              </Typography>
              <Controller
                name="formaPago"
                control={control}
                rules={{ required: "Selecciona cómo deseas pagar" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    className="select"
                    fullWidth
                    error={!!errors.formaPago}
                  >
                    <MenuItem value="" disabled>
                      Selecciona método
                    </MenuItem>
                    <MenuItem value="pse">PSE / Transferencia</MenuItem>
                    <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
                    <MenuItem value="efectivo">Efectivo contra entrega</MenuItem>
                  </Select>
                )}
              />
              {errors.formaPago && (
                <Typography color="error" className="size12" mt={0.5}>
                  {errors.formaPago.message}
                </Typography>
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                ¿Cómo prefieres recibirlo?
              </Typography>
              <Controller
                name="tipoEntrega"
                control={control}
                rules={{ required: "Elige un método de entrega" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    className="select"
                    fullWidth
                    error={!!errors.tipoEntrega}
                  >
                    <MenuItem value="" disabled>
                      Selecciona entrega
                    </MenuItem>
                    <MenuItem value="punto">Recoger en local</MenuItem>
                    <MenuItem value="domicilio">Envío a domicilio</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            {tipoEntrega === "punto" && (
              <Grid size={{ xs: 12 }}>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                >
                  <Typography className="size14 fontOnestSemiBold" mb={1} mt={2}>
                    Punto de recogida disponible
                  </Typography>
                  <Controller
                    name="puntoEntrega"
                    control={control}
                    rules={{ required: "Selecciona el punto de recogida" }}
                    render={({ field }) => (
                      <Select {...field} displayEmpty className="select" fullWidth>
                        <MenuItem value="" disabled>
                          Selecciona el punto
                        </MenuItem>
                        <MenuItem value="calle17">Sede Principal - Calle 17 #13-123</MenuItem>
                      </Select>
                    )}
                  />
                  <Box mt={1} p={1.5} bgcolor="var(--colorBlueLight)" borderRadius={2}>
                    <Typography className="size12 fontOnestMedium" color="var(--colorRed)">
                      * Tendrás 5 días hábiles para retirar tu pedido una vez confirmado.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* ── SECCIÓN 2: DATOS PERSONALES ── */}
        <Box sx={sectionStyle}>
          <Typography className="size20 fontOnestBold" mb={3}>
            Información del comprador
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Nombres
              </Typography>
              <Input
                className="input"
                placeholder="Juan"
                {...register("nombres", { required: "Campo requerido" })}
                error={!!errors.nombres}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Apellidos
              </Typography>
              <Input
                className="input"
                placeholder="Pérez"
                {...register("apellidos", { required: "Campo requerido" })}
                error={!!errors.apellidos}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Correo
              </Typography>
              <Input
                className="input"
                type="email"
                placeholder="correo@ejemplo.com"
                {...register("correo", { required: "Email requerido" })}
                error={!!errors.correo}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Teléfono
              </Typography>
              <Input
                className="input"
                placeholder="300 000 0000"
                {...register("telefono", { required: "Teléfono requerido" })}
                error={!!errors.telefono}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ── SECCIÓN 3: DIRECCIÓN (DINÁMICA) ── */}
        {tipoEntrega === "domicilio" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Box sx={sectionStyle}>
              <Typography className="size20 fontOnestBold" mb={3}>
                Dirección de envío
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                  <Typography className="size14 fontOnestSemiBold" mb={1}>
                    Dirección exacta
                  </Typography>
                  <Input
                    className="input"
                    placeholder="Calle, número, apto..."
                    {...register("direccion", { required: "Obligatorio" })}
                    error={!!errors.direccion}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Typography className="size14 fontOnestSemiBold" mb={1}>
                    Barrio
                  </Typography>
                  <Input
                    className="input"
                    placeholder="Nombre del barrio"
                    {...register("barrio", { required: "Obligatorio" })}
                    error={!!errors.barrio}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography className="size14 fontOnestSemiBold" mb={1}>
                    Notas adicionales (opcional)
                  </Typography>
                  <Input
                    className="input"
                    placeholder="Ej: Portería, casa de rejas blancas..."
                    {...register("indicaciones")}
                  />
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        )}

        {/* ── ACCIONES ── */}
        <Box display="flex" justifyContent="space-between" mt={4} mb={6}>
          <MainButton
            text="Volver al carrito"
            className="btnOutline"
            onClick={onBack}
            sx={{ px: 4 }}
          />
          <MainButton
            type="submit"
            text="Finalizar Pedido"
            className="btnRed"
            sx={{ px: 6, py: 1.5 }}
          />
        </Box>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
