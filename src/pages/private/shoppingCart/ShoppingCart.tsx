import { Box, Breadcrumbs, Grid, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import CustomImage from "@/components/customImage/CustomImage";
import imagen from "@/assets/images/products/naranja.png";
import imagen2 from "@/assets/images/products/frutatres.jpg";

import "./shoppingCart.scss";
import { MainButton } from "@/components/mainButton/MainButton";
import { Counter } from "@/components/counter/Counter";
import IconTrash from "@/assets/icon/IconTrash";

interface ICardDetail {
  image: string;
  category: string;
  name: string;
  weight: string;
  priceDiscount: number;
  priceNormal: number;
  amount: number;
}

const data = [
  {
    image: imagen,
    category: "Frutas y verduras",
    name: "Naranja Tangelo",
    weight: "1000 gr",
    priceDiscount: "6.400",
    priceNormal: "8.200",
    amount: 2,
  },
  {
    image: imagen2,
    category: "Frutas y verduras",
    name: "Zanahoria",
    weight: "1000 gr",
    priceDiscount: "4.900",
    priceNormal: "5.600",
    amount: 1,
  },
  // Agregué algunos productos adicionales para mostrar el scroll
  {
    image: imagen,
    category: "Frutas y verduras",
    name: "Manzana Roja",
    weight: "1000 gr",
    priceDiscount: "5.200",
    priceNormal: "6.800",
    amount: 4,
  },
  {
    image: imagen2,
    category: "Frutas y verduras",
    name: "Papa Criolla",
    weight: "1000 gr",
    priceDiscount: "3.900",
    priceNormal: "4.500",
    amount: 3,
  },
  {
    image: imagen,
    category: "Frutas y verduras",
    name: "Banano",
    weight: "1000 gr",
    priceDiscount: "3.200",
    priceNormal: "4.000",
    amount: 2,
  },
];

const ShoppingCart = () => {
  const [step, setStep] = useState<number>(1);

  const calculateSubtotal = () => {
    return data.reduce((total, product) => {
      const price = parseFloat(product.priceNormal.replace(/\./g, ""));
      return total + price;
    }, 0);
  };

  const calculateDiscount = () => {
    return data.reduce((total, product) => {
      const price = parseFloat(product.priceDiscount.replace(/\./g, ""));
      return total + price;
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const CardDetailProduct = ({
    image,
    category,
    name,
    weight,
    priceDiscount,
    priceNormal,
    amount,
  }: ICardDetail) => {
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
          <CustomImage src={image} alt={`imagen ${name}`} height={"100%"} radius="10px" />
        </Box>
        {/* INFO */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          p={"5px 0"}
          sx={{ flex: 1 }}
        >
          <Typography className="size11 fontOnestSemiBold">{category}</Typography>
          <Typography className="size16 fontOnestBold">{name}</Typography>
          <Typography className="size16">{weight}</Typography>
          <Box display={"flex"} gap={2} mt={0.5} sx={{ flexWrap: "wrap" }}>
            <Typography className="size16 fontOnestBold">${priceNormal}</Typography>
            <Typography
              className="size16 fontOnestBold"
              sx={{ textDecoration: "line-through", color: "var(--colorGrayDark)" }}
            >
              ${priceDiscount}
            </Typography>
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
          <IconButton>
            <IconTrash />
          </IconButton>
          <Counter initialValue={amount} />
        </Box>
      </Box>
    );
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();

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

      <Box className="cardBarProgress">
        <Typography className="size20 fontOnestBold">Proceso de compra</Typography>
        {/* PROGRESS-BAR */}
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

      {/* SHOPPING */}
      {step === 1 ? (
        <Grid container spacing={2} mt={4}>
          {/* GRID-PRODUCTS-LIST */}
          <Grid size={{ sm: 12, md: 8 }} className="card-grid">
            <Typography className="size20 fontOnestBold">Productos</Typography>
            {data?.map((product: any, index: number) => (
              <Box key={index} className="card-product-detail">
                <CardDetailProduct
                  category={product?.category}
                  image={product?.image}
                  name={product?.name}
                  weight={product.weight}
                  priceDiscount={product.priceDiscount}
                  priceNormal={product.priceNormal}
                  amount={product.amount}
                />
              </Box>
            ))}
          </Grid>

          {/* SUMMARY CON TODOS LOS PRODUCTOS Y SUBTOTAL AL FINAL */}
          <Grid size={{ sm: 12, md: 4 }} className="card-grid-summary">
            <Box>
              <Typography className="size20 fontOnestBold">Resumen</Typography>

              {/* Lista de productos sin scroll */}
              {data?.map((product: any, index: number) => (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  mt={0.5}
                  key={`resumen ${index}`}
                >
                  <Typography className="size14">{product.name}</Typography>
                  <Box display={"flex"} gap={2}>
                    <Typography
                      className="size14 fontOnestBold"
                      sx={{ color: "var(--colorGrayDark)", textDecoration: "line-through" }}
                    >
                      COP {product.priceDiscount}
                    </Typography>
                    <Typography className="size14 fontOnestBold">
                      COP {product.priceNormal}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box>
              {/* Línea divisoria */}
              <Box sx={{ borderTop: "1px solid var(--colorGray)", my: 2 }} />

              {/* Subtotal */}
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography className="size16 fontOnestSemiBold">Subtotal</Typography>
                <Typography className="size16 fontOnestBold">
                  COP {formatPrice(subtotal)}
                </Typography>
              </Box>
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
              {/* Botón de continuar */}
              <MainButton
                onClick={handleContinue}
                sx={{ width: "100%" }}
                text="Continuar"
                className="btnRed"
              />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ShoppingCart;
