import { Box, Typography } from "@mui/material";
// IMPORTADOS
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { ProductsData } from "../../../landing/components/ourProducts/types/typesProducts";
import "./cardProducts.scss";
import IconShop from "@/assets/icon/IconShop";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import { useAlertStore } from "@/store/alertStore";

interface ICardProduct {
  products: ProductsData;
  onClickView?: () => void;
  onClickAdd?: () => void;
}

const CardProducts = ({ products, onClickView, onClickAdd }: ICardProduct) => {
  const isMobile = useMemo(() => window.innerWidth <= 768, []);
  const [isAdding, setIsAdding] = useState(false);
  const { showAlert } = useAlertStore();

  const onAddClick = () => {
    setIsAdding(true);
    onClickAdd?.();
    setTimeout(() => setIsAdding(false), 1500);
    showAlert({
      type: "success",
      title: "¡Añadido!",
      message: `${products?.name} se agregó al carrito correctamente`,
      duration: 2000,
    });
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <Box className="card-product">
      {/* Label "Nuevo" con mejor estilo */}
      {products?.is_new && <Box className="label-new">Nuevo</Box>}

      <Box className="image-wrapper" onClick={onClickView} sx={{ cursor: "pointer" }}>
        <Box>
          <CustomImage
            src={products?.image}
            alt={products?.name}
            height={180}
            width={"100%"}
            radius="15px"
            objectFit="contain"
            zoom
          />
        </Box>
      </Box>

      <Box className="box-info-products">
        <Typography className="size16 fontOnestBold name-truncate">{products?.name}</Typography>
        <Typography className="size13 fontOnestLight secondary-text">
          {`${products?.quantity} ${products?.unit}`}
        </Typography>

        <Box className="price-container">
          <Typography className="size18 fontOnestBold price-discount">
            ${products?.unit_price_discount?.toLocaleString()}
          </Typography>
          <Typography className="size14 price-normal">
            ${products?.normal_unit_price?.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Box className="btns-container">
        <MainButton
          className="btnOutline"
          text={isMobile ? "Ver" : "Detalles"}
          onClick={onClickView}
        />
        <MainButton
          iconLeft={
            <motion.div
              key={isAdding ? "check" : "cart"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {isAdding ? (
                <CheckIcon sx={{ color: "var(--colorWhite)" }} />
              ) : (
                <IconShop height={22} width={22} color="var(--colorWhite)" />
              )}
            </motion.div>
          }
          className="btnRed"
          onClick={onAddClick}
        />
      </Box>
    </Box>
  );
};

export default CardProducts;
