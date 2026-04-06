import { Box, Breadcrumbs, Divider, Grid, Link, Typography, Skeleton, Alert } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomImage from "@/components/customImage/CustomImage";
import Califications from "@/components/califications/Califications";
import { Counter } from "@/components/counter/Counter";
import { MainButton } from "@/components/mainButton/MainButton";
import CardProducts from "../components/CardProducts";
import { useProducts } from "../../landing/components/ourProducts/hook/useProducts";
import "./productsDetail.scss";
import {
  ProductProps,
  ProductsData,
} from "../../landing/components/ourProducts/types/typesProducts";
import { RatingSummary } from "../types/typeProductDetail";

const ProductsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idProduct = location?.state?.product?.id;
  const [idLocal, setIdLocal] = useState<string>("");

  const { listProduct, refetch, loading, error } = useProducts(idLocal || idProduct);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    if (!idProduct && !idLocal) {
      navigate("/productos");
      return;
    }
    const productId = idProduct || idLocal;
    if (productId) {
      refetch();
    }
  }, [idLocal, idProduct, navigate, refetch]);

  const handleProductClick = useCallback(
    (product: ProductProps) => {
      setIdLocal(product.id);
      navigate(`/productos/${product.id}`, {
        state: { product },
        replace: true,
      });
    },
    [navigate]
  );

  // Loading state
  if (loading) {
    return (
      <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
        <Skeleton variant="text" width={300} height={40} />
        <Skeleton variant="text" width={200} height={30} sx={{ mb: 5 }} />
        <Grid container spacing={5}>
          <Grid size={{ sm: 12, md: 6 }}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid size={{ sm: 12, md: 6 }}>
            <Skeleton variant="text" width={100} height={30} />
            <Skeleton variant="text" width={250} height={40} />
            <Skeleton variant="text" width={150} height={30} sx={{ mt: 2 }} />
            <Skeleton variant="text" width="100%" height={100} sx={{ mt: 2 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Not found state
  if (!listProduct) {
    return (
      <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
        <Alert severity="info">Producto no encontrado</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
      {/* TITLE */}
      <Typography className="size30 fontOnestBold">Nuestros productos</Typography>
      <Breadcrumbs separator="|" sx={{ mb: 5 }}>
        <Link underline="hover" color="inherit" href="/inicio">
          Inicio
        </Link>
        <Link underline="hover" color="inherit" href="/productos">
          Productos
        </Link>
        <Typography sx={{ color: "text.primary" }}>
          {location?.state?.product?.name || listProduct.name}
        </Typography>
      </Breadcrumbs>

      {/* DETALLE DE UN PRODUCTO */}
      <Grid container spacing={5}>
        {/* IMAGEN */}
        <Grid size={{ sm: 12, md: 6 }}>
          <CustomImage alt={listProduct.name} src={listProduct.image} height={"60vh"} />
        </Grid>

        {/* DETALLE DE PRODUCTO */}
        <Grid size={{ sm: 12, md: 6 }}>
          <Box className="info-product">
            <Box>
              {/* CATEGORIA */}
              <Typography className="category-product">{listProduct.category}</Typography>
              {/* NOMBRE DEL PRODUCTO */}
              <Typography className="name-product">{listProduct.name}</Typography>
            </Box>

            {/* ESTRELLAS */}
            <Califications readOnly value={listProduct.average_rating} />

            {/* DESCRIPCION */}
            <Box>
              <Typography className="description-product">{listProduct.description}</Typography>
            </Box>

            {/* CANTIDAD DISPONIBLE */}
            <Box className="stock-product">
              <Typography>
                {listProduct.stock
                  ? `${listProduct.stock} Unidades disponibles`
                  : "No hay Unidades disponibles"}
              </Typography>
            </Box>

            {/* PESO o CANTIDAD DEL PRODUCTO */}
            <Typography className="weight-product">
              {listProduct.quantity} {listProduct.unit}
            </Typography>

            {/* CONTADOR */}
            <Box sx={{ display: "flex", gap: 2, mt: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
                <Typography className="count-product">Cantidad</Typography>
              </Box>
              <Counter limit={listProduct.stock} initialValue={0} />
            </Box>

            {/* PRECIOS */}
            <Box sx={{ display: "flex", gap: 2, mt: 1.5 }}>
              {listProduct.unit_price_discount && (
                <Typography
                  sx={{
                    color: "var(--colorGrayDark)",
                    textDecoration: "line-through",
                  }}
                  className="fontOnestSemiBold"
                >
                  ${listProduct.unit_price_discount}
                </Typography>
              )}
              <Typography
                sx={{
                  color: "var(--colorBlack)",
                }}
                className="fontOnestBold"
              >
                ${listProduct.normal_unit_price}
              </Typography>
            </Box>

            {/* BOTONES */}
            <Box sx={{ mt: 3, width: "100%" }}>
              <MainButton text="Agregar al carrito" className="btnRed" maxWidth />
              <MainButton />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* OPINIONES Y CALIFICACION */}
      <Divider sx={{ mt: 4, background: "var(--colorGray)" }} />
      <Box mt={6}>
        <Typography className="size30 fontOnestBold">Opiniones</Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }} className="grid-califications">
            <Typography mb={1} className="size16 fontOnestSemiBold">
              {listProduct.reviews?.length || 0} Calificaciones
            </Typography>
            <Califications value={listProduct.average_rating} size="small" />
            {listProduct.rating_summary?.map((rate: RatingSummary, index: number) => (
              <Box className="box-califications" key={rate.rating || index}>
                <Typography className="size14">{rate.rating} Estrellas</Typography>
                <Box
                  sx={{
                    width: "40%",
                    height: "10px",
                    backgroundColor: "var(--colorGray)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${rate.percentage || 0}%`,
                      backgroundColor: "var(--colorRed)",
                      height: "10px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </Box>
                <Box display="flex" gap={0.5}>
                  <Typography className="size14">{rate.percentage || 0}%</Typography>
                  <Typography className="size14">({rate.count || 0} reviews)</Typography>
                </Box>
              </Box>
            ))}

            {(!listProduct.rating_summary || listProduct.rating_summary.length === 0) && (
              <Typography color="text.secondary" sx={{ mt: 2 }}>
                No hay calificaciones disponibles
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 8 }} className="grid-califications">
            
          </Grid>
        </Grid>
      </Box>

      {/* ARTICULOS SIMILARES */}
      <Divider sx={{ mt: 4, background: "var(--colorGray)" }} />
      <Box mt={6}>
        <Typography className="size30 fontOnestBold">Artículos similares</Typography>
        {listProduct.similar_products && listProduct.similar_products.length > 0 ? (
          <Grid container spacing={2} className="grid-products">
            {listProduct.similar_products.map((product: ProductsData) => (
              <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={product.id}>
                <CardProducts products={product} onClick={() => handleProductClick(product)} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            No hay artículos similares disponibles
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ProductsDetail;
