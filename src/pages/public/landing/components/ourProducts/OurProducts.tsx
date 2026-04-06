import { Box, Button, Grid, Typography } from "@mui/material";
import CardCategory from "./components/CardCategory";
import { useNavigate } from "react-router-dom";
import { ProductProps } from "./types/typesProducts";
import "./ourProducts.scss";
import { useProducts } from "./hook/useProducts";

const OurProducts = () => {
  const navigate = useNavigate();
  const { listProducts } = useProducts();
  return (
    <Box
      sx={{
        padding: "6rem 2rem",
        backgroundColor: "var(--colorBlueLight)",
        width: "100%",
        borderRadius: "25px",
      }}
    >
      <Box className="OurProducts__container">
        <Typography className="title size40">Nuestros productos</Typography>
        <Typography className="text size16">
          ¡Estamos expandiendo nuestro catálogo! Regístrate para no perderte nuestras novedades
        </Typography>
        <Button className="btnRed size16" onClick={() => navigate("/productos")}>
          Ver catálogo completo
        </Button>
      </Box>
      <Grid container spacing={2} sx={{ mt: "80px" }}>
        {listProducts?.data?.map((product: ProductProps) => (
          <Grid size={{ xs: 6, md: 4, lg: 2.4 }} key={product.id}>
            <CardCategory image={product.image} title={product.name} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OurProducts;
