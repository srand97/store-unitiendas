import { useEffect } from "react";
import { Box, Divider, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MainButton } from "@/components/mainButton/MainButton";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import type { OrderResponse } from "../hook/useCheckout";
import { formatCOP } from "@/utils/formatters";

interface SuccessStepProps {
  order: OrderResponse | null;
}

const SuccessStep = ({ order }: SuccessStepProps) => {
  const { clearCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Disparamos el confeti al cargar el componente
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#ff0000", "#2196f3"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#ff0000", "#2196f3"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // El pedido ya quedo creado en el backend en este punto: limpiamos el
    // carrito local para que no se pueda reenviar el mismo pedido si el
    // usuario recarga o vuelve atras.
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinish = (path: string) => {
    navigate(path);
  };

  const isPickup = order?.fulfillment_method === "pickup";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 4, md: 6 },
        px: { xs: 2, sm: 4 },
        pb: 8,
      }}
    >
      {/* SECCIÓN DE ÉXITO ANIMADA */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: { xs: 80, md: 100 },
              color: "var(--colorRed)",
              mb: 2,
            }}
          />
        </motion.div>
        <Typography className="size40 fontOnestBold">¡Todo listo!</Typography>
        <Typography className="size18" sx={{ color: "text.secondary", mt: 1 }}>
          Tu pedido ha sido recibido y está en proceso de preparación.
        </Typography>
      </Box>

      {/* TICKET DE RESUMEN MODERNO */}
      <Box
        component={motion.div}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        sx={{
          width: "100%",
          maxWidth: 550,
          bgcolor: "white",
          borderRadius: "24px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid var(--colorBlueLight)",
        }}
      >
        <Box sx={{ bgcolor: "var(--colorBlueLight)", px: 4, py: 3 }}>
          <Typography className="size18 fontOnestBold">Resumen de tu pedido</Typography>
          <Typography className="size12" color="text.secondary">
            ID del pedido: #{order?.code ?? "—"}
          </Typography>
        </Box>

        <Box sx={{ px: 4, py: 2, maxHeight: 300, overflowY: "auto" }}>
          {order?.items.map((item) => (
            <Stack key={item.id} direction="row" spacing={2} py={2} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <Typography className="size14 fontOnestSemiBold">{item.product_name}</Typography>
                <Typography className="size12" color="text.secondary">
                  Cant: {item.quantity}
                </Typography>
              </Box>
              <Typography className="size14 fontOnestBold">
                {formatCOP(item.subtotal)}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Divider sx={{ borderStyle: "dashed", mx: 4 }} />

        <Box sx={{ px: 4, py: 3, bgcolor: "rgba(255, 0, 0, 0.02)" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography className="size18 fontOnestBold">Total a pagar</Typography>
            <Typography className="size24 fontOnestBold" color="var(--colorRed)">
              {formatCOP(order?.total_amount)}
            </Typography>
          </Stack>
        </Box>
      </Box>

      {/* INFO DE ENTREGA */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "var(--colorBlueLight)",
          borderRadius: "16px",
          maxWidth: 550,
          width: "100%",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography fontSize={24}>{isPickup ? "📦" : "🛵"}</Typography>
        <Typography className="size14 fontOnest">
          {isPickup ? (
            <>
              Recuerda que puedes recoger tu pedido en un máximo de{" "}
              <strong>5 días hábiles</strong>. Pago en efectivo al recogerlo.
            </>
          ) : (
            <>
              Tu pedido llegará a la dirección indicada. Ten el efectivo listo para pagar
              contraentrega.
            </>
          )}
        </Typography>
      </Box>

      {/* ACCIONES FINALIZACIÓN */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 5, width: "100%", maxWidth: 550 }}
      >
        <MainButton
          text="Volver al inicio"
          onClick={() => handleFinish("/inicio")}
          className="btnOutline"
          fullWidth
        />
        <MainButton
          text="Seguir explorando"
          onClick={() => handleFinish("/productos")}
          className="btnRed"
          fullWidth
        />
      </Stack>
    </Box>
  );
};

export default SuccessStep;
