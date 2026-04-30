import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { useEffect, useMemo } from "react";
import "./categoryDetail.scss";
import { useProducts } from "@/pages/public/landing/components/ourProducts/hook/useProducts";
import CardProducts from "../cardProducts/CardProducts";

const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { listProducts, loading } = useProducts();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  // Buscamos la categoría específica dentro de la data
  const categoryData = useMemo(() => {
    return listProducts?.data?.find(
      (cat: any) => cat.name.toLowerCase().replace(/\s+/g, "-") === slug
    );
  }, [listProducts, slug]);

  if (loading) return <Box p={5}>Cargando categoría...</Box>;

  return (
    <Box className="CategoryDetail">
      {/* Navegación y Título */}
      <Box mb={4}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link onClick={() => navigate("/inicio")} sx={{ cursor: "pointer" }}>
            Inicio
          </Link>
          <Link onClick={() => navigate("/productos")} sx={{ cursor: "pointer" }}>
            Productos
          </Link>
          <Typography color="text.primary">{categoryData?.name}</Typography>
        </Breadcrumbs>

        <Typography className="fontOnestBold size40">{categoryData?.name}</Typography>
        <Typography className="fontOnest size18" color="text.secondary">
          {categoryData?.description}
        </Typography>
      </Box>

      {/* Grid de Productos de la Categoría */}
      <Grid container spacing={3}>
        {categoryData?.products?.map((product: any) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }} key={product.id}>
            <CardProducts
              products={product}
              onClickView={() =>
                navigate(`/productos/${product.name.toLowerCase().replace(/\s+/g, "-")}`)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryDetail;
