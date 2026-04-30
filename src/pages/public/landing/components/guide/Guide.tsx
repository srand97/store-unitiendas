import { Box, Grid, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./guide.scss";

const ArrInfo = [
  {
    title: "Revisa nuestro catálogo",
    description: "Explora todos los productos disponibles y elige lo que tu tienda necesita.",
  },
  {
    title: "Compra",
    description: "Agrega tus productos al pedido y confirma tu selección. ¡Así de fácil!",
  },
  {
    title: "Coordina tu entrega",
    description: "Decide si prefieres recibir tu pedido en la tienda o pasar a recogerlo.",
  },
  {
    title: "Paga tu pedido",
    description: "Finaliza el proceso con un pago seguro y transparente. ¡Y listo!",
  },
];

const Guide = () => {
  const navigate = useNavigate();

  return (
    <Box className="Guide">
      <Box className="Guide__header">
        <Typography className="fontOnestBold size50 title">¿Cómo hacer tu pedido?</Typography>
        <Typography className="fontOnest size18 text">
          En menos tiempo del que esperas, porque nos importa tu tiempo.
        </Typography>
        <Button className="btnRed size16" sx={{ mt: 2 }} onClick={() => navigate("/productos")}>
          ¡Haz tu primer pedido!
        </Button>
      </Box>

      {/* Contenedor de la Línea con Animación Infinita */}
      <Box className="Guide__progress-container">
        <Box className="Guide__line-bg">
          <Box className="Guide__line-active" />
        </Box>
      </Box>

      <Grid container spacing={6} className="Guide__grid">
        {ArrInfo.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Typography className="fontOnestBold step-number">0{index + 1}</Typography>
              <Typography className="fontOnestSemiBold size20 title">{item.title}</Typography>
              <Typography className="fontOnest size15 description">{item.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Guide;
