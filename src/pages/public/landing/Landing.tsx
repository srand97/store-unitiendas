import { Box, Grid, Typography } from "@mui/material";

//IMPORTADOS
import Carousel from "@/components/carousel/Carousel";
import { ArrImages } from "./utils/utils";
import AboutMe from "./components/aboutMe/AboutMe";
import ContactUs from "./components/contactUs/ContactUs";
import Comments from "./components/comments/Comments";
import Guide from "./components/guide/Guide";
import OurProducts from "./components/ourProducts/OurProducts";
import "./landing.scss";
import { motion } from "framer-motion";

const items = [
  {
    text: "Mejores precios.",
  },
  {
    text: "Más ventas.",
  },
  {
    text: "Más oportunidades.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const Landing = () => {
  return (
    <Box className="containerLanding">
      {/* CAROUSEL */}
      <Box mt={-2}>
        <Carousel
          images={ArrImages}
          width={"100%"}
          height={{ xs: "35vh", md: "60vh", lg: "90vh" }}
          borderRadius={"0px 0px 20px 20px"}
        />
      </Box>

      <Box sx={{ padding: "2rem 0", borderBottom: "0.5px solid var(--colorGray)" }}>
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "text.secondary",
            mb: 2,
            ml: 4,
          }}
        >
          ¿Por qué elegirnos?
        </Typography>

        <Grid
          container
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {items.map((element, index) => (
            <Grid
              key={index}
              size={{ xs: 12, md: 4 }}
              display="flex"
              alignItems="center"
              justifyContent={"center"}
              gap={2}
              p={{ xs: "1.2rem 1.5rem", md: "1.5rem 2rem" }}
              sx={{
                borderRight: {
                  md: index < items.length - 1 ? "0.5px solid var(--colorGray)" : "none",
                },
                borderBottom: {
                  xs: index < items.length - 1 ? "0.5px solid var(--colorGray)" : "none",
                  md: "none",
                },
              }}
              component={motion.div}
              variants={itemVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Box
                component={motion.div}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15 + 0.2,
                  type: "spring",
                  stiffness: 200,
                }}
                sx={{
                  width: 10,
                  height: 10,
                  minWidth: 10,
                  borderRadius: "50%",
                  background: "var(--colorRed)",
                }}
              />
              <Typography className="size40 fontOnestSemiBold">{element.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ABOUT ME */}
      <Box className="containerAboutMe">
        <AboutMe />
      </Box>

      {/* OUR PRODUCTS */}
      <Box className="containerOurProducts">
        <OurProducts />
      </Box>

      {/* SUPPLIERS (Provedores) */}
      <Box className="containerContactUs">
        <ContactUs />
      </Box>

      {/* GUIDE */}
      <Box className="containerGuide">
        <Guide />
      </Box>

      {/* COMMENTS */}
      <Box className="containerComments">
        <Comments />
      </Box>
    </Box>
  );
};

export default Landing;
