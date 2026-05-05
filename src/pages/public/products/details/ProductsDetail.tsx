import {
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Link,
  Typography,
  Skeleton,
  Alert,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomImage from "@/components/customImage/CustomImage";
import Califications from "@/components/califications/Califications";
import { Counter } from "@/components/counter/Counter";
import { MainButton } from "@/components/mainButton/MainButton";
import CardProducts from "../components/cardProducts/CardProducts";
import { useProducts } from "../../landing/components/ourProducts/hook/useProducts";
import "./productsDetail.scss";
import {
  ProductProps,
  ProductsData,
} from "../../landing/components/ourProducts/types/typesProducts";
import { RatingSummary } from "../types/typeProductDetail";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { useAlertStore } from "@/store/alertStore";

const ProductsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const idProduct = location?.state?.product?.id;
  const [idLocal, setIdLocal] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  //QUALIFY
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { listProduct, refetch, loading, error } = useProducts(idLocal || idProduct);
  const { addProduct } = useCartStore();
  const { showAlert } = useAlertStore();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [idLocal]);

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      // Aquí integras tu llamada al backend:
      // await postReview({ productId: idProduct, comment: newComment, rating: newRating });

      console.log("Enviando:", { newComment, newRating });

      // Limpiar formulario tras éxito
      setNewComment("");
      setNewRating(5);
      // refetch(); // Para actualizar la lista de comentarios
    } catch (err) {
      console.error("Error al publicar comentario", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const handleAddToCart = (product: ProductsData, qty: number = 1) => {
    if (qty === 0) {
      showAlert({
        title: "Error",
        message: "La cantidad debe ser mayor a 0",
        type: "error",
      });
      return;
    }
    addProduct({
      id: product.id,
      name: product.name,
      normalPrice: product.normal_unit_price,
      priceDiscount: product.unit_price_discount,
      image: product.image,
      category: product.category,
      quantity: qty,
    });
    showAlert({
      title: "Producto añadido",
      message: "El producto ha sido añadido al carrito",
      type: "success",
    });
  };

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
      <Grid container spacing={{ xs: 2, md: 5 }} m={{ sm: "0 0rem", md: "0 2rem", lg: "0 10rem" }}>
        {/* IMAGEN */}
        <Grid size={{ xs: 12, sm: 12, md: 5 }}>
          <CustomImage
            alt={listProduct.name}
            src={listProduct.image}
            height={{ xs: "35vh", sm: "45vh", md: "55vh", lg: "60vh" }}
            radius="16px"
            objectFit="fill"
          />
        </Grid>

        {/* DETALLE DE PRODUCTO */}
        <Grid size={{ xs: 12, sm: 12, md: 7 }}>
          <Box className="info-product">
            <Box>
              <Typography className="category-product">{listProduct.category}</Typography>
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

            {/* PRECIOS — subidos antes del counter para mejor lectura en mobile */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1.5, flexWrap: "wrap" }}>
              <Typography sx={{ color: "var(--colorBlack)" }} className="fontOnestBold size20">
                ${listProduct.normal_unit_price}
              </Typography>
              {listProduct.unit_price_discount && (
                <Typography
                  sx={{ color: "var(--colorGrayDark)", textDecoration: "line-through" }}
                  className="fontOnestSemiBold size16"
                >
                  ${listProduct.unit_price_discount}
                </Typography>
              )}
            </Box>

            {/* CONTADOR */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2, flexWrap: "wrap" }}>
              <Typography className="count-product">Cantidad</Typography>
              <Counter
                limit={listProduct.stock}
                initialValue={1}
                onValueChange={(val: number) => setQuantity(val)}
              />
            </Box>

            {/* BOTONES */}
            <Box
              sx={{
                mt: 3,
                width: "100%",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <motion.div whileTap={{ scale: 0.95 }} style={{ width: "100%", maxWidth: "400px" }}>
                <MainButton
                  text="Agregar al carrito"
                  className="btnRed"
                  maxWidth
                  onClick={() => handleAddToCart(listProduct, quantity)}
                />
              </motion.div>
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
            <Califications value={listProduct.average_rating} size="small" readOnly />
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
            <Divider sx={{ my: 4, opacity: 0.5 }} />

            {/* FORMULARIO PARA AGREGAR COMENTARIO */}
            <Box component="form" onSubmit={handleSubmitReview} className="form-review">
              <Typography className="size18 fontOnestBold" mb={2}>
                Deja tu opinión
              </Typography>

              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography className="size14 fontOnest">Tu calificación:</Typography>
                <Califications value={newRating} setValue={setNewRating} size="small" />
              </Box>

              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Cuéntanos tu experiencia con este producto..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                    fontFamily: "Onest",
                    backgroundColor: "var(--colorWhite)",
                  },
                }}
              />

              <MainButton
                type="submit"
                text={isSubmitting ? "Enviando..." : "Publicar comentario"}
                className="btnRed"
                sx={{ mt: 2, width: "100%" }}
                disabled={isSubmitting || !newComment.trim()}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 8 }} className="grid-reviews-list">
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {listProduct.reviews && listProduct.reviews.length > 0 ? (
                listProduct.reviews.map((review: any, index: number) => (
                  <Box
                    key={review.id || index}
                    component={motion.div}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    sx={{
                      p: 3,
                      borderRadius: "20px",
                      bgcolor: "var(--colorWhite)",
                      border: "1px solid var(--colorBlueLight)",
                      transition: "all 0.3s ease",
                      "&:hover": { boxShadow: "0 8px 20px rgba(0,0,0,0.04)" },
                    }}
                  >
                    {/* HEADER DEL COMENTARIO */}
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "var(--colorBlueLight)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "var(--colorBlack)",
                          }}
                        >
                          {review.user?.charAt(0)}
                        </Box>
                        <Box>
                          <Typography className="size16 fontOnestBold">{review.user}</Typography>
                          <Typography className="size12" sx={{ color: "text.secondary" }}>
                            {new Date(review.created_at).toLocaleDateString("es-CO", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </Typography>
                        </Box>
                      </Box>
                      <Califications value={review.rating} size="small" readOnly />
                    </Box>

                    {/* CUERPO DEL COMENTARIO */}
                    <Typography
                      className="size14 fontOnest"
                      sx={{ color: "var(--colorGrayDark)", lineHeight: 1.6 }}
                    >
                      “{review.comment}”
                    </Typography>
                  </Box>
                ))
              ) : (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    bgcolor: "var(--colorBlueLight)",
                    borderRadius: "20px",
                  }}
                >
                  <Typography className="size14 fontOnest" color="text.secondary">
                    Este producto aún no tiene reseñas detalladas.
                  </Typography>
                </Box>
              )}
            </Box>
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
                <CardProducts
                  products={product}
                  onClickView={() => handleProductClick(product)}
                  onClickAdd={() => handleAddToCart(product)}
                />
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
