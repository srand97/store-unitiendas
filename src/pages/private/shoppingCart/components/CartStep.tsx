import IconTrash from "@/assets/icon/IconTrash";
import { Counter } from "@/components/counter/Counter";
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { CartProduct, useCartStore } from "@/store/cartStore";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface CartStepProps {
  onContinue: () => void;
}

const CartStep = ({ onContinue }: CartStepProps) => {
  const { products, totalPrice, updateQuantity, removeProduct } = useCartStore();
  const navigate = useNavigate();

  const formatPrice = (price: number | string) => {
    const numeric =
      typeof price === "string" ? parseFloat(price.replace(/\./g, "").replace(",", ".")) : price;

    return Math.round(numeric)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const calculateDiscount = () => {
    const total = products.reduce((acc, product) => {
      return acc + (product.priceDiscount ?? 0);
    }, 0);
    return Math.round(total * 100) / 100;
  };

  const discount = calculateDiscount();

  const CardDetailProduct = ({ item }: { item: CartProduct }) => {
    return (
      <Box display={"flex"} gap={3}>
        {/* IMAGE */}
        <Box
          sx={{
            width: { xs: "80px", sm: "100px", md: "120px" },
            height: { xs: "80px", sm: "100px", md: "120px" },
            flexShrink: 0,
          }}
        >
          {item.image ? (
            <CustomImage
              src={item.image}
              alt={`imagen ${item.name}`}
              height={"100%"}
              radius="10px"
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                bgcolor: "grey.100",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontSize={11} color="text.disabled">
                Sin imagen
              </Typography>
            </Box>
          )}
        </Box>

        {/* INFO */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          p={"5px 0"}
          sx={{ flex: 1 }}
        >
          {item.category && (
            <Typography className="size11 fontOnestSemiBold">{item.category}</Typography>
          )}
          <Typography className="size16 fontOnestBold">{item.name}</Typography>
          {item.weight && <Typography className="size16">{item.weight}</Typography>}
          <Box display={"flex"} gap={2} mt={0.5} sx={{ flexWrap: "wrap" }}>
            <Typography className="size16 fontOnestBold">
              ${formatPrice(item.normalPrice)}
            </Typography>
            {item.priceDiscount !== undefined && (
              <Typography
                className="size16 fontOnestBold"
                sx={{ textDecoration: "line-through", color: "var(--colorGrayDark)" }}
              >
                ${formatPrice(item.priceDiscount)}
              </Typography>
            )}
          </Box>
        </Box>

        {/* ACTIONS */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"start"}
          alignItems={"end"}
          gap={2}
        >
          <IconButton onClick={() => removeProduct(item.id)}>
            <IconTrash />
          </IconButton>
          <Counter
            initialValue={item.quantity}
            onValueChange={(newQty: number) => updateQuantity(item.id, newQty)}
          />
        </Box>
      </Box>
    );
  };

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography className="size20 fontOnestSemiBold" color="text.secondary">
          Tu carrito está vacío
        </Typography>
        <MainButton
          text="Ver productos"
          onClick={() => navigate("/productos")}
          sx={{ mt: 3 }}
          className="btnRed"
        />
      </Box>
    );
  }

  return (
    <Grid container spacing={2} mt={4}>
      {/* LISTA DE PRODUCTOS */}
      <Grid size={{ sm: 12, md: 8 }} className="card-grid">
        <Typography className="size20 fontOnestBold">Productos</Typography>
        {products.map((product) => (
          <Box key={product.id} className="card-product-detail">
            <CardDetailProduct item={product} />
          </Box>
        ))}
      </Grid>

      {/* RESUMEN */}
      <Grid size={{ sm: 12, md: 4 }} className="card-grid-summary">
        <Box>
          <Typography className="size20 fontOnestBold">Resumen</Typography>
          {products.map((product) => (
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              mt={0.5}
              key={`resumen-${product.id}`}
            >
              <Typography className="size14">
                {product.name}{" "}
                <Typography component="span" className="size12" color="text.secondary">
                  x{product.quantity}
                </Typography>
              </Typography>
              <Box display={"flex"} gap={2}>
                {product.priceDiscount !== undefined && (
                  <Typography
                    className="size14 fontOnestBold"
                    sx={{ color: "var(--colorGrayDark)", textDecoration: "line-through" }}
                  >
                    COP {formatPrice(product.priceDiscount * product.quantity)}
                  </Typography>
                )}
                <Typography className="size14 fontOnestBold">
                  COP {formatPrice(product.normalPrice * product.quantity)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box>
          <Box sx={{ borderTop: "1px solid var(--colorGray)", my: 2 }} />

          {/* Subtotal */}
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography className="size16 fontOnestSemiBold">Subtotal</Typography>
            <Typography className="size16 fontOnestBold">
              COP {formatPrice(totalPrice())}
            </Typography>
          </Box>

          {/* Descuento */}
          {discount > 0 && (
            <Box display={"flex"} justifyContent={"space-between"} mb={2}>
              <Typography
                className="size12 fontOnestSemiBold"
                sx={{ color: "var(--colorGrayDark)" }}
              >
                Descuento total
              </Typography>
              <Typography className="size12 fontOnestBold" sx={{ color: "var(--colorGrayDark)" }}>
                COP {formatPrice(discount)}
              </Typography>
            </Box>
          )}

          <MainButton
            onClick={onContinue}
            sx={{ width: "100%", mt: 2 }}
            text="Continuar"
            className="btnRed"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartStep;
