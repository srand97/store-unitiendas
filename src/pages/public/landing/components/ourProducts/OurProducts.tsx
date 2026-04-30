import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CardCategory } from "./components/CardCategory";
import { useProducts } from "./hook/useProducts";
import "./ourProducts.scss";

const OurProducts = () => {
  const navigate = useNavigate();
  const { listProducts, loading } = useProducts();
  return (
    <Box
      sx={{
        padding: { xs: "4rem 1.5rem", md: "6rem 4rem" },
        backgroundColor: "var(--colorBlueLight)",
        width: "100%",
        borderRadius: { xs: "0px", md: "40px" },
      }}
    >
      <Box
        className="OurProducts__container"
        sx={{
          width: { xs: "100%", md: "45%", lg: "35%" },
          textAlign: { xs: "center", md: "left" },
          display: { xs: "flex", md: "block" },
          flexDirection: "column",
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        <Typography className="title size40">Nuestros productos</Typography>
        <Typography className="text size16" sx={{ color: "var(--colorGrayDark)", mb: 3 }}>
          ¡Estamos expandiendo nuestro catálogo! Regístrate para no perderte nuestras novedades.
        </Typography>
        <Button className="btnRed size16" onClick={() => navigate("/productos")}>
          Ver catálogo completo
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: { xs: "40px", md: "80px" } }}>
        {loading
          ? Array.from(new Array(5)).map((_, index) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={index}>
                <Box sx={{ borderRadius: "25px", overflow: "hidden" }}>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={180}
                    animation="wave"
                    sx={{ bgcolor: "var(--colorGray)", opacity: 0.3 }}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    sx={{ mt: 1, mx: "auto", bgcolor: "var(--colorGray)" }}
                  />
                </Box>
              </Grid>
            ))
          : listProducts?.data?.map((product) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={product.id}>
                <CardCategory
                  image={product.image}
                  title={product.name}
                  onClick={() =>
                    navigate(
                      `/categoria/${(product.name as string)?.toLowerCase().replace(/\s+/g, "-")}`
                    )
                  }
                />
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

export default OurProducts;
