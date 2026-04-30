// src/pages/shoppingCart/components/SuccessStep.tsx
import { Box, Divider, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { MainButton } from "@/components/mainButton/MainButton";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";

const formatPrice = (price: number | string) => {
  const numeric =
    typeof price === "string" ? parseFloat(price.replace(/\./g, "").replace(",", ".")) : price;
  return Math.round(numeric)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const SuccessStep = () => {
  const { products, totalPrice, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleGoHome = () => {
    clearCart();
    navigate("/inicio");
  };

  const handleGoProducts = () => {
    clearCart();
    navigate("/productos");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 4, md: 6 },
        px: { xs: 1, sm: 4 },
      }}
    >
      {/* ICONO Y TÍTULO */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CheckCircleOutlineIcon
          sx={{
            fontSize: { xs: 64, md: 80 },
            color: "var(--colorRed)",
            mb: 2,
          }}
        />
        <Typography className="size30 fontOnestBold">¡Pedido realizado!</Typography>
        <Typography className="size16" sx={{ color: "var(--colorGrayDark)", mt: 1 }}>
          Tu compra fue procesada exitosamente. Pronto recibirás confirmación.
        </Typography>
      </Box>

      {/* CARD RESUMEN */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        {/* HEADER CARD */}
        <Box
          sx={{
            bgcolor: "var(--colorRed)",
            px: 3,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className="size16 fontOnestBold" sx={{ color: "white" }}>
            Resumen del pedido
          </Typography>
          <Typography className="size12" sx={{ color: "rgba(255,255,255,0.8)" }}>
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </Typography>
        </Box>

        {/* LISTA DE PRODUCTOS */}
        <Box sx={{ px: 3, pt: 2, maxHeight: 260, overflowY: "auto" }}>
          {products.map((product, index) => (
            <Box key={product.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 1.5,
                  gap: 2,
                }}
              >
                {/* Imagen */}
                {product.image && (
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 1.5,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography className="size14 fontOnestSemiBold" noWrap>
                    {product.name}
                  </Typography>
                  {product.weight && (
                    <Typography className="size12" sx={{ color: "var(--colorGrayDark)" }}>
                      {product.weight}
                    </Typography>
                  )}
                </Box>

                {/* Cantidad y precio */}
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  <Typography className="size12" sx={{ color: "var(--colorGrayDark)" }}>
                    x{product.quantity}
                  </Typography>
                  <Typography className="size14 fontOnestBold">
                    COP {formatPrice(product.normalPrice * product.quantity)}
                  </Typography>
                </Box>
              </Box>
              {index < products.length - 1 && <Divider sx={{ borderColor: "var(--colorGray)" }} />}
            </Box>
          ))}
        </Box>

        {/* TOTAL */}
        <Box
          sx={{
            px: 3,
            py: 2,
            mt: 1,
            borderTop: "2px solid var(--colorGray)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className="size16 fontOnestSemiBold">Total pagado</Typography>
          <Typography className="size20 fontOnestBold" sx={{ color: "var(--colorRed)" }}>
            COP {formatPrice(totalPrice())}
          </Typography>
        </Box>
      </Box>

      {/* MENSAJE EXTRA */}
      <Box
        sx={{
          mt: 3,
          px: 3,
          py: 2,
          bgcolor: "#fff8f8",
          borderRadius: 2,
          border: "1px solid var(--colorGray)",
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Typography className="size14" sx={{ color: "var(--colorGrayDark)" }}>
          📦 Tu pedido puede ser recogido a más tardar en <strong>5 días hábiles</strong>. Revisa tu
          correo para más detalles.
        </Typography>
      </Box>

      {/* BOTONES */}
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
        <MainButton
          text="Volver al inicio"
          onClick={handleGoHome}
          sx={{ flex: 1 }}
          className="btnWhite"
        />
        <MainButton
          text="Seguir comprando"
          onClick={handleGoProducts}
          className="btnRed"
          sx={{ flex: 1 }}
        />
      </Box>
    </Box>
  );
};

export default SuccessStep;
