import { Box, MenuItem, Select, Typography, Grid, Input, TextareaAutosize } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";
import { MainButton } from "@/components/mainButton/MainButton";
import { useCheckout, type FulfillmentMethod, type OrderResponse } from "../hook/useCheckout";

// TODO: reemplazar con el punto de recogida real (nombre + direccion).
// Cuando existan varios puntos, esto deberia venir de un endpoint en vez
// de estar hardcodeado aqui.
const PICKUP_POINT_LABEL = "Sede Principal - Calle 17 #13-123";

interface DeliveryFormData {
  fulfillment_method: FulfillmentMethod;
  delivery_phone: string;
  delivery_address: string;
  notes: string;
}

interface PaymentFormProps {
  onContinue: (order: OrderResponse) => void;
  onBack: () => void;
}

const PaymentForm = ({ onContinue, onBack }: PaymentFormProps) => {
  const { createOrder, loading } = useCheckout();
  const {
    handleSubmit,
    control,
    watch,
    register,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    mode: "onChange",
    defaultValues: {
      fulfillment_method: "pickup",
      delivery_phone: "",
      delivery_address: "",
      notes: "",
    },
  });

  const fulfillmentMethod = watch("fulfillment_method");

  const onSubmit = async (data: DeliveryFormData) => {
    const response = await createOrder({
      fulfillment_method: data.fulfillment_method,
      delivery_address: data.fulfillment_method === "delivery" ? data.delivery_address : undefined,
      delivery_phone: data.delivery_phone,
      notes: data.notes,
    });

    if (response?.success && response.data) {
      onContinue(response.data);
    }
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
        {/* ── SECCIÓN: MÉTODO DE ENTREGA ── */}
        <Box sx={sectionStyle}>
          <Typography className="size20 fontOnestBold" mb={1}>
            ¿Cómo prefieres recibir tu pedido?
          </Typography>
          <Typography className="size12 fontOnest" color="text.secondary" mb={3}>
            Por ahora solo manejamos pago en efectivo, contraentrega o en el punto de recogida.
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Método de entrega
              </Typography>
              <Controller
                name="fulfillment_method"
                control={control}
                rules={{ required: "Elige un método de entrega" }}
                render={({ field }) => (
                  <Select {...field} displayEmpty className="select" fullWidth>
                    <MenuItem value="pickup">Recoger en punto físico</MenuItem>
                    <MenuItem value="delivery">Envío a domicilio (contraentrega)</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1}>
                Teléfono de contacto
              </Typography>
              <Input
                className="input"
                placeholder="300 000 0000"
                fullWidth
                {...register("delivery_phone", { required: "El teléfono es obligatorio" })}
                error={!!errors.delivery_phone}
              />
              {errors.delivery_phone && (
                <Typography color="error" className="size12" mt={0.5}>
                  {errors.delivery_phone.message}
                </Typography>
              )}
            </Grid>

            {fulfillmentMethod === "pickup" && (
              <Grid size={{ xs: 12 }}>
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
                  <Box mt={1} p={1.5} bgcolor="var(--colorBlueLight)" borderRadius={2}>
                    <Typography className="size14 fontOnestSemiBold">
                      Punto de recogida: {PICKUP_POINT_LABEL}
                    </Typography>
                    <Typography className="size12 fontOnestMedium" color="var(--colorRed)" mt={0.5}>
                      * Pago en efectivo al recoger. Tendrás 5 días hábiles para retirar tu pedido
                      una vez confirmado.
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            )}

            {fulfillmentMethod === "delivery" && (
              <Grid size={{ xs: 12 }}>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Typography className="size14 fontOnestSemiBold" mb={1} mt={1}>
                    Dirección / punto de referencia
                  </Typography>
                  <TextareaAutosize
                    minRows={3}
                    className="input"
                    style={{ width: "100%", fontFamily: "inherit", padding: 12 }}
                    placeholder="Ej: Casa azul frente al parque, barrio El Bosque, cerca a la tienda X"
                    {...register("delivery_address", {
                      required: "La dirección o referencia es obligatoria",
                    })}
                  />
                  {errors.delivery_address && (
                    <Typography color="error" className="size12" mt={0.5}>
                      {errors.delivery_address.message}
                    </Typography>
                  )}
                  <Typography className="size12 fontOnestMedium" color="var(--colorRed)" mt={1}>
                    * Pago en efectivo contraentrega.
                  </Typography>
                </motion.div>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Typography className="size14 fontOnestSemiBold" mb={1} mt={1}>
                Notas adicionales (opcional)
              </Typography>
              <Input
                className="input"
                fullWidth
                placeholder="Ej: Portería, casa de rejas blancas..."
                {...register("notes")}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ── ACCIONES ── */}
        <Box display="flex" justifyContent="space-between" mt={4} mb={6}>
          <MainButton
            text="Volver al carrito"
            className="btnOutline"
            onClick={onBack}
            type="button"
            sx={{ px: 4 }}
          />
          <MainButton
            type="submit"
            text={loading ? "Enviando pedido..." : "Finalizar Pedido"}
            className="btnRed"
            disabled={loading}
            sx={{ px: 6, py: 1.5 }}
          />
        </Box>
      </form>
    </motion.div>
  );
};

export default PaymentForm;
