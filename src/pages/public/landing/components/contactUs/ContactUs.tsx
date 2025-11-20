import { Box, Button, Grid, Typography } from "@mui/material";
import "./contactUs.scss";
import CornerRibbon from "@/components/ribbon/CornerRibbon";
import imgContact from "@/assets/images/camión1.png";
import CustomImage from "@/components/customImage/CustomImage";
import { useState } from "react";
import PreRegistration from "./components/PreRegistration";
import Modal from "@/components/modal/Modal";
const ContactUs = () => {
  const [stateModal, setStateModal] = useState<boolean>(false);

  return (
    <Box className="ContactUs__container">
      <CornerRibbon
        position="top-right"
        width={"50%"}
        primaryColor="var(--colorGray)"
        isBorderRadius
        height={"50px"}
      />

      <Grid container spacing={2} sx={{ display: "flex", alignItems: "center" }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography className="size40 fontOnestSemiBold" mb={2} mt={{ xs: 5, md: 0 }}>
            ¡Abre la puerta a nuevas oportunidades de venta!
          </Typography>
          <Typography className="size16 fontOnest" mb={2}>
            Al unirte a nuestra red, llegarás de forma directa a nuevos clientes, aumentarás tus
            ventas y fortalecerás tu presencia en el mercado local.
          </Typography>
          <Typography className="size16 fontOnest" mb={2}>
            Te invitamos a ser parte de nuestros proveedores
          </Typography>
          <Button className="btnRed size16" onClick={() => setStateModal(true)}>
            ¡Quiero unirme como proveedor!
          </Button>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} mt={4}>
          <CustomImage src={imgContact} alt="camion" width={"100%"} height={"60vh"} />
        </Grid>
      </Grid>

      {/* MODAL PRE_REGISTRO */}
      <Modal isOpen={stateModal} onClose={() => setStateModal(false)}>
        <PreRegistration />
      </Modal>
    </Box>
  );
};

export default ContactUs;
