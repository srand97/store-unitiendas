import { Box, Breadcrumbs, Link, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./components/PaymentForm";
import CartStep from "./components/CartStep";
import SuccessStep from "./components/SuccessStep";
import type { OrderResponse } from "./hook/useCheckout";
import { useAuthStore } from "@/store/authStore";
import { useAlertStore } from "@/store/alertStore";
import "./shoppingCart.scss";

const ShoppingCart = () => {
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState(1); // 1 para adelante, -1 para atrás
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.isAuth);
  const { showAlert } = useAlertStore();

  // Ir del Resumen (1) al paso de Entrega (2) requiere estar logueado,
  // porque crear un pedido en el backend exige un usuario autenticado.
  // El carrito en si sigue siendo visible para invitados.
  const handleContinueFromCart = () => {
    if (!isAuth) {
      showAlert({
        type: "info",
        title: "Inicia sesión",
        message: "Necesitas iniciar sesión para continuar con tu pedido.",
      });
      navigate("/inicio-sesion", { state: { from: "/carrito" } });
      return;
    }
    setDirection(1);
    setStep(2);
  };

  const handleOrderCreated = (createdOrder: OrderResponse) => {
    setOrder(createdOrder);
    setDirection(1);
    setStep(3);
  };

  const handleBack = () => {
    setDirection(-1);
    if (step > 1) setStep(step - 1);
  };

  // Variantes para el deslizamiento de los pasos
  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <Box className="ShoppingCart">
      {/* HEADER */}
      <Box mb={4}>
        <Typography className="size30 fontOnestBold">Carrito de compras</Typography>
        <Breadcrumbs separator="|" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/inicio">
            Inicio
          </Link>
          <Link underline="hover" color="inherit" href="/productos">
            Productos
          </Link>
          <Typography color="text.primary">Checkout</Typography>
        </Breadcrumbs>
      </Box>

      {/* PROGRESS BAR MODERNA */}
      <Box className="cardBarProgress">
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography className="size20 fontOnestBold">Finalizar Compra</Typography>
          <Typography className="size14 fontOnestSemiBold" color="var(--colorRed)">
            Paso {step} de 3
          </Typography>
        </Stack>

        <Box className="progress-container">
          <motion.div
            className="progress__line"
            initial={false}
            animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </Box>

        <Box className="step-labels">
          <Typography className={`label ${step >= 1 ? "active" : ""}`}>Resumen</Typography>
          <Typography className={`label ${step >= 2 ? "active" : ""}`}>Pago</Typography>
          <Typography className={`label ${step >= 3 ? "active" : ""}`}>Confirmación</Typography>
        </Box>
      </Box>

      {/* CONTENEDOR DE PASOS ANIMADO */}
      <Box className="step-content-wrapper">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {step === 1 && <CartStep onContinue={handleContinueFromCart} />}
            {step === 2 && <PaymentForm onContinue={handleOrderCreated} onBack={handleBack} />}
            {step === 3 && <SuccessStep order={order} />}
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
