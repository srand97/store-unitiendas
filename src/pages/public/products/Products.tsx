import { Box, Breadcrumbs, Grid, Link, Typography, Skeleton } from "@mui/material";
import CustomImage from "@/components/customImage/CustomImage";
import { ProductProps, ProductsData } from "../landing/components/ourProducts/types/typesProducts";
import { MainButton } from "@/components/mainButton/MainButton";
import CardProducts from "./components/cardProducts/CardProducts";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../landing/components/ourProducts/hook/useProducts";
import "./products.scss";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { useAlertStore } from "@/store/alertStore";

// Skeleton Components
const CategorySkeleton = () => (
  <Grid container spacing={10} className="grid-category">
    {[...Array(6)].map((_, index) => (
      <Grid
        key={`skeleton-cat-${index}`}
        size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
        className="box-category-round"
      >
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" width="80%" height={20} />
      </Grid>
    ))}
  </Grid>
);

const ProductCardSkeleton = () => (
  <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
    <Box className="card-product">
      <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: "15px" }} />
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="40%" height={20} />
      <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: "8px" }} />
    </Box>
  </Grid>
);

const Products = () => {
  const navigate = useNavigate();
  const { listProducts, loading } = useProducts();
  const { addProduct } = useCartStore();
  const { showAlert } = useAlertStore();

  const handleCategoryClick = (categoryName: string) => {
    const slug = categoryName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/categoria/${slug}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const handleAddToCart = (product: ProductsData) => {
    addProduct({
      id: product.id,
      name: product.name,
      normalPrice: product.normal_unit_price,
      priceDiscount: product.unit_price_discount,
      image: product.image,
      category: product.category,
    });

    showAlert({
      type: "success",
      title: "¡Logrado!",
      message: `${product.name} se agregó al carrito correctamente`,
      duration: 2000,
    });

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handleNavigateDetail = (name: string, id: string) => {
    navigate(`/productos/${name.toLowerCase().replace(/\s+/g, "-")}`, {
      state: { product: { id, name } },
    });
  };

  const categories = useMemo(() => {
    return listProducts?.data || [];
  }, [listProducts]);

  // Show all skeletons while loading
  if (loading) {
    return (
      <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" } }}>
        {/* Title Skeleton */}
        <Skeleton variant="text" width={300} height={40} className="size30 fontOnestBold" />
        <Skeleton variant="text" width={200} height={30} sx={{ mb: 5 }} />

        {/* Categories Section Skeleton */}
        <Box
          sx={{
            padding: { xs: "5px", sm: "10px", md: "1rem 2rem", lg: "2rem 5rem" },
            backgroundColor: "var(--colorBlueLight)",
            width: "100%",
            borderRadius: "25px",
          }}
        >
          <Skeleton variant="text" width={400} height={40} />
          <Skeleton variant="text" width={300} height={24} />
          <CategorySkeleton />
        </Box>

        {/* Products Section Skeleton */}
        <Box mt={4}>
          {[...Array(3)].map((_, categoryIndex) => (
            <Box mb={5} key={`skeleton-category-${categoryIndex}`}>
              <Skeleton variant="text" width={250} height={35} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Skeleton variant="text" width="60%" height={24} />
                <Skeleton
                  variant="rectangular"
                  width={100}
                  height={36}
                  sx={{ borderRadius: "8px" }}
                />
              </Box>
              <Grid container spacing={3} className="grid-products">
                {[...Array(6)].map((_, productIndex) => (
                  <ProductCardSkeleton key={`skeleton-product-${categoryIndex}-${productIndex}`} />
                ))}
              </Grid>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  // Show empty state if no products
  if (categories.length === 0) {
    return (
      <Box sx={{ p: { xs: "10px", sm: "1rem", lg: "3rem 2rem" }, textAlign: "center" }}>
        <Typography className="size30 fontOnestBold">No hay productos disponibles</Typography>
        <Typography sx={{ mt: 2, color: "text.secondary" }}>Por favor, vuelve más tarde</Typography>
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
        <Typography sx={{ color: "text.primary" }}>Productos</Typography>
      </Breadcrumbs>

      {/* Categories Section */}
      <Box
        sx={{
          padding: { xs: "5px", sm: "10px", md: "1rem 2rem", lg: "2rem 5rem" },
          backgroundColor: "var(--colorBlueLight)",
          width: "100%",
          borderRadius: "25px",
        }}
      >
        <Typography className="size30 fontOnestBold">¿Qué estás buscando hoy?</Typography>
        <Typography className="size14">
          Productos esenciales de calidad, al alcance de tu negocio
        </Typography>

        {/* CATEGORIAS */}
        <Grid
          container
          spacing={4} // Reducimos de 10 a 4 para mayor control
          justifyContent="center" // Centra las categorías si no llenan la fila
          sx={{ mt: 4, mb: 2 }}
        >
          {categories.map((product: ProductProps) => (
            <Grid
              key={product.id}
              size={{ xs: 4, sm: 3, md: 2, lg: 1.5 }} // Ajuste fino del tamaño
              display="flex"
              flexDirection="column"
              alignItems="center"
              onClick={() => handleCategoryClick(product.name as string)}
              sx={{ cursor: "pointer" }}
            >
              <Box
                className="category-item-wrapper"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "120px", // Limita el ancho para mantener la proporción
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  sx={{
                    width: { xs: 70, md: 90 },
                    height: { xs: 70, md: 90 },
                    mb: 1.5,
                    position: "relative",
                  }}
                >
                  <CustomImage
                    src={product.image}
                    alt={product.name}
                    width="100%"
                    height="100%"
                    radius="50%"
                    boxShadow={true}
                    priority={true}
                    objectFit="cover"
                    pointer
                  />
                </Box>

                <Typography
                  className="size14 fontOnestSemiBold"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    lineHeight: 1.2,
                    height: "34px", // Altura fija para 2 líneas de texto
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "var(--colorBlack)",
                  }}
                >
                  {product.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PRODUCTS BY CATEGORY */}
      <Box mt={4}>
        {categories.map((category: ProductProps) => (
          <Box mb={5} key={`product-${category.id}`}>
            <Typography className="size30 fontOnestBold">{category.name}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography className="size14" sx={{ flex: 1 }}>
                {category.description}
              </Typography>
              {category.products && category?.products?.length > 5 && (
                <MainButton
                  className="btnRed"
                  text="ver más..."
                  onClick={() => handleCategoryClick(category.name as string)}
                />
              )}
            </Box>

            {/* PRODUCT CARDS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid-products"
            >
              <Grid container spacing={3}>
                {category?.products?.slice(0, 6).map((product, index) => (
                  <Grid
                    key={product.id || `product-${category.id}-${index}`}
                    size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
                  >
                    <CardProducts
                      products={product}
                      onClickView={() => handleNavigateDetail(product?.name, product?.id)}
                      onClickAdd={() => handleAddToCart({ ...product, category: category.name })}
                    />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
