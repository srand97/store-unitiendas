import { Box, Button, Grid, Typography } from "@mui/material";
import { motion, Variants } from "framer-motion";
import { ArrInfo } from "../../utils/utils";
import "./aboutMe.scss";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const CardInfo = ({ icon: Icon, title, description, index }: any) => (
  <Box
    variants={cardVariants}
    component={motion.div}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="about-card"
  >
    <Box className="icon-wrapper">
      <Icon sx={{ fontSize: 30, color: "var(--colorRed)" }} />
    </Box>
    <Box className="content-wrapper">
      <Typography className="fontOnestSemiBold size18 title">{title}</Typography>
      <Typography className="fontOnest size15 description">{description}</Typography>
    </Box>
  </Box>
);

const AboutMe = () => {
  return (
    <Box className="AboutMe">
      <Box className="AboutMe__header">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography className="fontOnestBold size50 title" sx={{ mb: 1 }}>
            ¿Quiénes Somos?
          </Typography>

          <Typography
            className="fontOnestBold size20 tagline"
            sx={{ color: "var(--colorRed)", mb: 3 }}
          >
            Unitiendas, un corazón en cada esquina.
          </Typography>

          <Typography
            className="fontOnestSemiBold size20 description"
            sx={{ mb: 2, lineHeight: 1.4 }}
          >
            Conectamos la tradicional tienda de barrio con la empresa productora, sin intermediarios
            y con una logística inteligente.
          </Typography>

          <Typography className="fontOnest size16 text" sx={{ opacity: 0.9, maxWidth: "800px" }}>
            Estamos construyendo la red de colaboración que permita a ambos crecer. Los tenderos
            acceden a mejores precios y condiciones, y las empresas amplían su alcance de forma
            directa y sostenible. Creemos en el valor de las alianzas que impulsan negocios y
            comunidades.
          </Typography>

          <Button className="btnRed size16" sx={{ mt: 4, px: 4 }}>
            Conocer nuestra red
          </Button>
        </motion.div>
      </Box>

      <Grid container spacing={3} className="AboutMe__grid" sx={{ mt: 6 }}>
        {ArrInfo?.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }} key={index}>
            <CardInfo
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AboutMe;
