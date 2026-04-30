import { Box, Button, Grid, Typography } from "@mui/material";
import { motion, Variants } from "framer-motion";
import IconAdd from "@mui/icons-material/Add";
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
      <Icon />
    </Box>
    <Box className="content-wrapper">
      <Typography className="fontOnestSemiBold size18 title">{title}</Typography>
      <Typography className="fontOnest size15 description">{description}</Typography>
    </Box>
    {/* <Button className="btnOutline size14">
      <IconAdd sx={{ fontSize: 18 }} />
      Saber más
    </Button> */}
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
          <Typography className="fontOnestBold size50 title">¿Quiénes Somos?</Typography>
          <Typography className="fontOnestSemiBold size20 description">
            Uni Tiendas conecta a tenderos con proveedores de productos esenciales.
          </Typography>
          <Typography className="fontOnest size16 text">
            Buscamos construir una red de colaboración que permita a ambos crecer: los tenderos
            acceden a mejores precios y condiciones, y los proveedores amplían su alcance de forma
            directa y sostenible.
          </Typography>
          <Button className="btnRed size16" sx={{ mt: 2 }}>
            Quiero saber más
          </Button>
        </motion.div>
      </Box>

      <Grid container spacing={4} className="AboutMe__grid">
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
