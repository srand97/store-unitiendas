import { Box, Typography } from "@mui/material";
// IMPORTADOS
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { ProductsData } from "../../landing/components/ourProducts/types/typesProducts";
import "./cardProducts.scss";
import IconShop from "@/assets/icon/IconShop";

const CardProducts = (products: ProductsData) => {
  return (
    <Box className="card-product">
      {products.new && <Box className="label">Nuevo</Box>}
      <Box>
        <CustomImage src={products.image} height={250} width={250} radius="10px" />
      </Box>
      <Box className="box-info-products">
        <Typography className="size16 fontOnestBold">{products.name}</Typography>
        <span className="size14 fontOnestLight">{products.weight}</span>
        <Typography className="size16 fontOnestBold" mt={2} gap={2} display={"flex"}>
          ${products.unit_price_discount}{" "}
          <span style={{ color: "#A5BEC3", textDecoration: "line-through" }}>
            ${products.normal_unit_price}
          </span>
        </Typography>
      </Box>
      <Box className="btns">
        <MainButton className="btnView" text="Ver producto" />
        <MainButton
          iconLeft={<IconShop height={20} width={20} color="#fff" />}
          className="btnBuy"
        />
      </Box>
    </Box>
  );
};

export default CardProducts;
