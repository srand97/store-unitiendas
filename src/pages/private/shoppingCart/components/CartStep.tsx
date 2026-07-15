import IconTrash from "@/assets/icon/IconTrash";
import { Counter } from "@/components/counter/Counter";
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { Box, Grid, IconButton, Typography, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatCOP, getEffectivePrice, hasRealDiscount } from "@/utils/formatters";

interface CartStepProps {
  onContinue: () => void;
}

const CartStep = ({ onContinue }: CartStepProps) => {
  const { products, totalPrice, finalTotal, updateQuantity, removeProduct } = useCartStore();
  const navigate = useNavigate();

  // Calculamos el descuento real basado en la diferencia de precios
  const totalSavings = products.reduce((acc, item) => {
    if (item.priceDiscount) {
      return acc + (item.normalPrice - item.priceDiscount) * item.quantity;
    }
    return acc;
  }, 0);

  if (products.length === 0) {
    return (
      <Box className="cart-empty-state">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Typography className="size24 fontOnestBold">Tu carrito está vacío</Typography>
          <Typography className="size16 fontOnest" sx={{ mb: 4, color: "text.secondary" }}>
            Parece que aún no has agregado nada a tu pedido.
          </Typography>
          <MainButton
            text="Ir a la tienda"
            onClick={() => navigate("/productos")}
            className="btnRed"
          />
        </motion.div>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} mt={2}>
      {/* COLUMNA IZQUIERDA: LISTA */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography className="size20 fontOnestBold" mb={3}>
          Productos ({products.length})
        </Typography>

        <Box className="cart-items-list">
          <AnimatePresence mode="popLayout">
            {products.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="cart-item-card"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 3, sm: 2 }}>
                    <CustomImage
                      src={item.image}
                      alt={item.name}
                      height={80}
                      width={80}
                      radius="12px"
                      objectFit="contain"
                    />
                  </Grid>

                  <Grid size={{ xs: 6, sm: 7 }}>
                    <Typography className="size12 fontOnestSemiBold" color="var(--colorRed)">
                      {item.category}
                    </Typography>
                    <Typography className="size16 fontOnestBold">{item.name}</Typography>
                    <Typography className="size14 fontOnest" color="text.secondary">
                      {item.weight}
                    </Typography>

                    <Box display="flex" gap={1} alignItems="center" mt={1}>
                      <Typography className="size16 fontOnestBold">
                        {formatCOP(getEffectivePrice(item.normalPrice, item.priceDiscount))}
                      </Typography>
                      {hasRealDiscount(item.normalPrice, item.priceDiscount) && (
                        <Typography
                          className="size12"
                          sx={{ textDecoration: "line-through", color: "text.disabled" }}
                        >
                          {formatCOP(item.normalPrice)}
                        </Typography>
                      )}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 3, sm: 3 }} sx={{ textAlign: "right" }}>
                    <IconButton onClick={() => removeProduct(item.id)} sx={{ mb: 1 }}>
                      <IconTrash color="var(--colorGrayDark)" />
                    </IconButton>
                    <Counter
                      initialValue={item.quantity}
                      onValueChange={(val) => updateQuantity(item.id, val)}
                    />
                  </Grid>
                </Grid>
                <Divider sx={{ mt: 2, borderColor: "var(--colorBlueLight)" }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Box>
      </Grid>

      {/* COLUMNA DERECHA: RESUMEN (STICKY) */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Box className="cart-summary-card">
          <Typography className="size20 fontOnestBold" mb={3}>
            Resumen de compra
          </Typography>

          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography className="fontOnest">Subtotal</Typography>
              <Typography className="fontOnestSemiBold">{formatCOP(totalPrice())}</Typography>
            </Box>

            {totalSavings > 0 && (
              <Box display="flex" justifyContent="space-between" sx={{ color: "var(--colorRed)" }}>
                <Typography className="fontOnest">Descuento aplicado</Typography>
                <Typography className="fontOnestSemiBold">- {formatCOP(totalSavings)}</Typography>
              </Box>
            )}

            <Box display="flex" justifyContent="space-between">
              <Typography className="fontOnest">Envío</Typography>
              <Typography className="fontOnestSemiBold" color="success.main">
                Gratis
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography className="size18 fontOnestBold">Total</Typography>
              <Typography className="size22 fontOnestBold" color="var(--colorBlack)">
                {formatCOP(finalTotal())}
              </Typography>
            </Box>

            <MainButton
              onClick={onContinue}
              text="Continuar al pago"
              className="btnRed"
              fullWidth
              sx={{ py: 2, mt: 2 }}
            />

            <Typography className="size12 fontOnest" textAlign="center" color="text.secondary">
              Impuestos incluidos en el precio
            </Typography>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartStep;
