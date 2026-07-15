import { Box, IconButton, Typography } from "@mui/material";
// IMPORTADOS
import CustomImage from "@/components/customImage/CustomImage";
import { MainButton } from "@/components/mainButton/MainButton";
import { ProductsData } from "../../../landing/components/ourProducts/types/typesProducts";
import "./cardProducts.scss";
import IconShop from "@/assets/icon/IconShop";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import { useCartStore } from "@/store/cartStore";
import { formatCOP, getEffectivePrice, hasRealDiscount } from "@/utils/formatters";

interface ICardProduct {
  products: ProductsData;
  onClickView?: () => void;
  onClickAdd?: () => void;
}

const CardProducts = ({ products, onClickView, onClickAdd }: ICardProduct) => {
  const isMobile = useMemo(() => window.innerWidth <= 768, []);
  const [isAdding, setIsAdding] = useState(false);

  const { products: productsStore } = useCartStore();

  const onAddClick = () => {
    setIsAdding(true);
    onClickAdd?.();
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const getQuantityProducts = useMemo(() => {
    return productsStore.find((p) => p.id === products?.id)?.quantity || 0;
  }, [productsStore]);

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
            {formatCOP(getEffectivePrice(products?.normal_unit_price, products?.unit_price_discount))}
          </Typography>
          {hasRealDiscount(products?.normal_unit_price, products?.unit_price_discount) && (
            <Typography className="size14 price-normal">
              {formatCOP(products?.normal_unit_price)}
            </Typography>
          )}
        </Box>
      </Box>

      <Box className="btns-container">
        <MainButton
          className="btnOutline"
          text={isMobile ? "Ver" : "Detalles"}
          onClick={onClickView}
        />
        <IconButton className="btnRed" onClick={onAddClick}>
          <motion.div
            key={isAdding ? "check" : "cart"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            {isAdding ? (
              <CheckIcon sx={{ color: "var(--colorWhite)" }} />
            ) : getQuantityProducts > 0 ? (
              <Typography className="size12 fontOnestBold quantity">{getQuantityProducts}</Typography>
            ) : (
              <IconShop height={22} width={22} color="var(--colorWhite)" />
            )}
          </motion.div>
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardProducts;
