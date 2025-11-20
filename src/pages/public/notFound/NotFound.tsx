import { MainButton } from "@/components/mainButton/MainButton";
import IconArrowBottom from "@/assets/icon/IconArrowBottom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./notFound.scss";

const NotFound = () => {
  const navigate = useNavigate();
  useDocumentTitle("Página no encontrada | Prizma");

  return (
    <Box className="notFoundContainer">
      <Box className="notFoundContent">
        <Typography className="notFoundTitle">ERROR 404</Typography>
        <Typography className="notFoundSubtitle">¡Oops! Pagina no encontrada...</Typography>
        <Typography className="notFoundDescription">
          ¡No te preocupes vuelve atras!
        </Typography>
        <Box className="notFoundButton">
          <MainButton
            className="btnRed"
            text="Volver"
            onClick={() => navigate(-1)}
            iconRight={<IconArrowBottom width="12" height="12" color="var(--colorWhite)" />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
