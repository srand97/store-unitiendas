import { Box, Grid, Typography, Button } from "@mui/material";
import "./guide.scss";

const ArrInfo = [
  {
    title: "Revisa nuestro catálogo",
    description:
      "Explora todos los productos disponibles y elige lo que tu tienda necesita, sin complicaciones.",
  },
  {
    title: "Compra",
    description: "Agrega tus productos al pedido y confirma tu selección. ¡Así de fácil!",
  },
  {
    title: "Coordina tu entrega o recogida",
    description:
      "Decide si prefieres recibir tu pedido en la tienda o pasar a recogerlo en el punto acordado.",
  },
  {
    title: "Paga tu pedido",
    description: "Finaliza el proceso con un pago seguro y transparente. ¡Y listo!",
  },
];

const Guide = () => {
  return (
    <Box
      sx={{
        padding: "6rem 2rem",
        backgroundColor: "var(--colorBlueLight)",
        width: "100%",
        borderRadius: "25px",
      }}
    >
      <Box className="Guide__container">
        <Typography className="title size40">¿Cómo hacer tu pedido?</Typography>
        <Typography className="text size16">
          En menos tiempo del que esperas, nos importa tu tiempo.
        </Typography>
        <Button className="btnRed size16">¡Haz tu primer pedido!</Button>
      </Box>
      <Box sx={{ width: "100%", height: "100%", backgroundColor: "var(--colorGray)" }}>
        <Box className="Guide__line" />
      </Box>
      <Grid container spacing={5} className="Guide__grid">
        {ArrInfo?.map((item, index) => (
          <Grid size={{ xs: 12, md: 4, lg: 3 }} key={index}>
            <Box>
              <Typography className="title size18">{item.title}</Typography>
              <Typography className="description size16">{item.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Guide;
