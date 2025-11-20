/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid, Typography } from "@mui/material";

// IMPORTADOS
import "./aboutMe.scss";
import { ArrInfo } from "../../utils/utils";
import IconAdd from "@mui/icons-material/Add";

const AboutMe = () => {
  const CardInfo = ({
    icon: Icon,
    title,
    description,
  }: {
    icon: any;
    title: string;
    description: string;
  }) => {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Icon height={25} width={25} />
        </Box>
        <Box>
          <Typography className="title size18">{title}</Typography>
          <Typography className="description size16">{description}</Typography>
        </Box>
        <Box>
          <Button
            className="btnWhite size16"
            sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <IconAdd />
            Ver más
          </Button>
        </Box>
      </Box>
    );
  };
  return (
    <Box>
      <Box className="AboutMe__container">
        <Typography className="title size40">¿Quiénes Somos?</Typography>
        <Typography className="description size18">
          Uni Tiendas conecta a tenderos con proveedores de productos esenciales.
        </Typography>
        <Typography className="text size16">
          Buscamos construir una red de colaboración que permita a ambos crecer: los tenderos
          acceden a mejores precios y condiciones, y los proveedores amplían su alcance de forma
          directa y sostenible. Creemos en el valor de las alianzas que impulsan negocios,
          comunidades y oportunidades para todos.
        </Typography>
        <Button className="btnRed size16">Quiero saber más</Button>
      </Box>
      <Grid container spacing={5} className="AboutMe__grid">
        {ArrInfo?.map((item, index) => (
          <Grid size={{ xs: 12, md: 4, lg: 2.4 }} key={index}>
            <CardInfo icon={item.icon} title={item.title} description={item.description} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutMe;
