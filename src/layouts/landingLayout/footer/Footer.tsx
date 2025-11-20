// src/layouts/landingLayout/footer/Footer.jsx
import { Box, Typography, Grid } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

//IMPORTADOS
import CornerRibbon from "@/components/ribbon/CornerRibbon";
import logoLetter from "@/assets/images/logoLetters.png";
import "./footer.scss";

const Footer = () => {
  return (
    <Box className="footer">
      <CornerRibbon position="top-right" width={"50%"} height={"52px"} />
      <Box>
        <Grid container spacing={1} alignItems="center">
          {/* Logo */}
          <Grid size={{ sm: 12, md: 12, lg: 12, xl: 6 }}>
            <Box className="logo">
              <img src={logoLetter} alt="Logo" style={{ width: "650px", height: "200px" }} />
            </Box>
          </Grid>

          {/* Contacto */}
          <Grid size={{ sm: 12, md: 12, lg: 12, xl: 6 }}>
            <Typography gutterBottom className="size64" sx={{ fontFamily: "Onest-SemiBold" }}>
              Contáctanos
            </Typography>
            <Typography className="size18" sx={{ mb: 2 }}>
              Resolver tus dudas y acompañarte es parte de lo que hacemos.
            </Typography>

            <Grid container spacing={1}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box className="contact">
                  <WhatsAppIcon />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>WhatsApp</Typography>
                    <Typography>+57 312 345 6789</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box className="contact">
                  <EmailIcon />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Correo electrónico</Typography>
                    <Typography>uni-tiendas@gmail.com</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <AccessTimeIcon />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography>Horarios de atención</Typography>
                    <Typography>Lunes a Viernes 7am - 6pm</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
