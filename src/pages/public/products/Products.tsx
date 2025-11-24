import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
// IMPORTADOS
import { listProducts } from "../landing/components/ourProducts/utils/data";
import "./products.scss";
import CustomImage from "@/components/customImage/CustomImage";
import { ProductProps } from "../landing/components/ourProducts/types/typesProducts";
import { MainButton } from "@/components/mainButton/MainButton";
import CardProducts from "./components/CardProducts";

const Products = () => {
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
        <Box className="grid-category">
          {listProducts.data.map((product: ProductProps) => (
            <Box className="box-category-round">
              <CustomImage
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                radius="50%"
                boxShadow={true}
              />
              <Typography className="size14">{product.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      {/* CAITEGORIAS Y PRODUCTOS */}
      <Box mt={4}>
        {listProducts.data.map((category: ProductProps) => (
          <Box mb={5}>
            <Typography className="size30 fontOnestBold">{category.name}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography className="size14">{category.description}</Typography>
              <MainButton className="btnRed" text="ver más..." />
            </Box>

            {/* CARTAS DE PRODUCTOS */}
            <Box className="grid-products">
              {category?.products?.slice(0, 6).map((product, index) => (
                <CardProducts {...product} key={product.id || index} />
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Products;
