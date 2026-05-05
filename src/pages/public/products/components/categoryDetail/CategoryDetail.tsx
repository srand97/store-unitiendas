import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Breadcrumbs, Link } from "@mui/material";
import { useEffect, useMemo } from "react";
import "./categoryDetail.scss";
import { useProducts } from "@/pages/public/landing/components/ourProducts/hook/useProducts";
import CardProducts from "../cardProducts/CardProducts";
import { useCartStore } from "@/store/cartStore";
import { ProductsData } from "@/pages/public/landing/components/ourProducts/types/typesProducts";

const CategoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { listProducts, loading } = useProducts();
  const { addProduct } = useCartStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleNavigateDetail = (name: string, id: string) => {
    navigate(`/productos/${name.toLowerCase().replace(/\s+/g, "-")}`, {
      state: { product: { id, name } },
    });
  };

  const handleAddToCart = (product: ProductsData, qty: number = 1) => {
    addProduct({
      id: product.id,
      name: product.name,
      normalPrice: product.normal_unit_price,
      priceDiscount: product.unit_price_discount,
      image: product.image,
      category: product.category,
      quantity: qty,
    });
  };
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
              onClickView={() => handleNavigateDetail(product.name, product.id)}
              onClickAdd={() => handleAddToCart(product)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryDetail;
