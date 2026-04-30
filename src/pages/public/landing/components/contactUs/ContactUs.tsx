import { Box, Button, Grid, Typography } from "@mui/material"; // Usando Grid2
import { motion } from "framer-motion";
import { useState } from "react";
import CornerRibbon from "@/components/ribbon/CornerRibbon";
import imgContact from "@/assets/images/camión1.png";
import CustomImage from "@/components/customImage/CustomImage";
import PreRegistration from "./components/PreRegistration";
import Modal from "@/components/modal/Modal";
import "./contactUs.scss";

const ContactUs = () => {
  const [stateModal, setStateModal] = useState<boolean>(false);

  return (
    <Box className="ContactUs">
      <Box className="ContactUs__container">
        <CornerRibbon
          position="top-right"
          width={"50%"}
          primaryColor="var(--colorGray)"
          isBorderRadius
          height={"50px"}
        />

        <Grid container spacing={4} alignItems="center">
          {/* Texto con entrada desde la izquierda */}
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                className="size40 fontOnestBold"
                mb={3}
                mt={{ xs: 5, md: 0 }}
                sx={{ lineHeight: 1.2 }}
              >
                ¡Abre la puerta a nuevas oportunidades de venta!
              </Typography>
              <Typography
                className="size16 fontOnest"
                mb={3}
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                Al unirte a nuestra red, llegarás de forma directa a nuevos clientes, aumentarás tus
                ventas y fortalecerás tu presencia en el mercado local.
              </Typography>

              <Button
                className="btnRed size16"
                onClick={() => setStateModal(true)}
                sx={{ px: 4, py: 1.5 }}
              >
                ¡Quiero unirme como proveedor!
              </Button>
            </motion.div>
          </Grid>

          {/* Imagen con efecto de flotación o revelado */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="image-wrapper"
            >
              <CustomImage
                src={imgContact}
                alt="camion de reparto"
                width={"100%"}
                height={{ xs: "300px", md: "500px" }}
                objectFit="contain"
                zoom
              />
            </motion.div>
          </Grid>
        </Grid>

        {/* MODAL PRE_REGISTRO */}
        <Modal isOpen={stateModal} onClose={() => setStateModal(false)} width={900} isClickOverOut>
          <PreRegistration />
        </Modal>
      </Box>
    </Box>
  );
};

export default ContactUs;
