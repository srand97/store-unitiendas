import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { useState } from "react";
import "./shoppingCart.scss";
import PaymentForm from "./components/PaymentForm";
import CartStep from "./components/CartStep";
import SuccessStep from "./components/SuccessStep";

const ShoppingCart = () => {
  const [step, setStep] = useState<number>(1);

  const handleContinue = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
      {/* TITLE */}
      <Typography className="size30 fontOnestBold">Carrito de compras</Typography>
      <Breadcrumbs separator="|" sx={{ mb: 5 }}>
        <Link underline="hover" color="inherit" href="/inicio">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/productos">
          Productos
        </Link>
      </Breadcrumbs>

      {/* PROGRESS BAR */}
      <Box className="cardBarProgress">
        <Typography className="size20 fontOnestBold">Proceso de compra</Typography>
        <Box sx={{ width: "100%", height: "100%", backgroundColor: "var(--colorGray)" }}>
          <Box
            className="progress__line"
            sx={{ width: step === 1 ? "25%" : step === 2 ? "75%" : "100%" }}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className="size16 fontOnestSemiBold">Mi carrito</Typography>
          <Typography className="size16 fontOnestSemiBold">Metodo de pago</Typography>
          <Typography className="size16 fontOnestSemiBold">Confirmación de pedido</Typography>
        </Box>
      </Box>

      {/* STEPS */}
      {step === 1 && <CartStep onContinue={handleContinue} />}
      {step === 2 && <PaymentForm onContinue={handleContinue} onBack={() => setStep(1)} />}
      {step === 3 && <SuccessStep />}
    </Box>
  );
};

export default ShoppingCart;
