import Footer from "@/layouts/landingLayout/footer/Footer";
import { Box, Grid, Typography } from "@mui/material";

//IMPORTADOS
import Header from "@/layouts/landingLayout/header/Header";
import Carousel from "@/components/carousel/Carousel";
import { ArrImages } from "./utils/utils";
import AboutMe from "./components/aboutMe/AboutMe";
import ContactUs from "./components/contactUs/ContactUs";
import Comments from "./components/comments/Comments";
import Guide from "./components/guide/Guide";
import OurProducts from "./components/ourProducts/OurProducts";
import "./landing.scss";

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

const Landing = () => {
  return (
    <Box className="containerLanding">
      {/* HEADER */}
      <Header />

      {/* CAROUSEL */}
      <Carousel
        images={ArrImages}
        width={"100%"}
        height={"90vh"}
        borderRadius={"0px 0px 20px 20px"}
      />

      <Grid
        container
        spacing={1}
        sx={{
          margin: "20px 0",
          padding: "50px 0",
          borderBottom: "2px solid var(--colorGray)",
        }}
      >
        {items.map((element) => (
          <Grid
            size={{ xs: 4 }}
            display={"flex"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box sx={{ background: "var(--colorRed)", borderRadius: "50%", p: 1 }} />
            <Typography className="size72 fontOnestBold">{element.text}</Typography>
          </Grid>
        ))}
      </Grid>

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

      {/* FOOTER */}
      <Footer />
    </Box>
  );
};

export default Landing;
