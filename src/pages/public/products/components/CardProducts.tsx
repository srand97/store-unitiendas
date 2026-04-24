import { Box, Typography } from "@mui/material";
// IMPORTADOS
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { ProductsData } from "../../landing/components/ourProducts/types/typesProducts";
import "./cardProducts.scss";
import IconShop from "@/assets/icon/IconShop";

interface ICardProduct {
  products: ProductsData;
  onClickView?: () => void;
  onClickAdd?: () => void;
}

const CardProducts = ({ products, onClickView, onClickAdd }: ICardProduct) => {
  return (
    <Box className="card-product">
      {products?.is_new && <Box className="label">Nuevo</Box>}
      <Box width={"-webkit-fill-available"}>
        <CustomImage
          src={products?.image}
          alt={products?.name}
          height={200}
          width={"auto"}
          radius="10px"
          fallbackText="Imagen no disponible"
          objectFit="fill"
          zoom
        />
      </Box>
      <Box className="box-info-products">
        <Typography className="size16 fontOnestBold">{products?.name}</Typography>
        <span className="size14 fontOnestLight">{`${products?.quantity}  ${products?.unit}`}</span>
        <Typography className="size16 fontOnestBold" mt={2} gap={2} display={"flex"}>
          ${products?.unit_price_discount}
          <span style={{ color: "#A5BEC3", textDecoration: "line-through" }}>
            ${products?.normal_unit_price}
          </span>
        </Typography>
      </Box>
      <Box className="btns">
        <MainButton className="btnView" text="Ver producto" onClick={onClickView} />
        <MainButton
          iconLeft={<IconShop height={20} width={20} color="#fff" />}
          className="btnBuy"
          onClick={onClickAdd}
        />
      </Box>
    </Box>
  );
};

export default CardProducts;
