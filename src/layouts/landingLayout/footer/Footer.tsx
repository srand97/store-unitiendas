import { Box, Typography, Grid } from "@mui/material"; // Usando Grid2
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// IMPORTADOS
import CornerRibbon from "@/components/ribbon/CornerRibbon";
import logoLetter from "@/assets/images/logoLetters.png";
import CustomImage from "@/components/customImage/CustomImage";
import "./footer.scss";

const Footer = () => {
  return (
    <Box id="footer-section" component="footer" className="footer">
      <CornerRibbon
        position="top-right"
        width={"50%"}
        height={"52px"}
        primaryColor="var(--colorBlack)"
      />

      <Box className="footer-container">
        {/* Grid Principal */}
        <Grid container spacing={6} alignItems="center">
          {/* Columna Logo */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Box className="footer-logo">
              <CustomImage alt="logo" width={"100%"} height={"auto"} src={logoLetter} />
            </Box>
          </Grid>

          {/* Columna Contacto */}
          <Grid size={{ xs: 12, lg: 6 }}>
            <Typography className="size50 fontOnestBold" sx={{ mb: 2, color: "var(--colorWhite)" }}>
              Contáctanos
            </Typography>
            <Typography
              className="size18 fontOnest"
              sx={{ mb: 4, color: "var(--colorGray)", maxWidth: "500px" }}
            >
              Resolver tus dudas y acompañarte es parte de lo que hacemos cada día.
            </Typography>

            {/* Grid de Ítems de Contacto */}
            <Grid container spacing={2}>
              {/* WhatsApp */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  className="contact-item"
                  onClick={() => window.open("https://wa.me/573123456789")}
                >
                  <WhatsAppIcon className="icon" />
                  <Box>
                    <Typography
                      className="size14 fontOnestBold"
                      sx={{ color: "var(--colorRedLight)" }}
                    >
                      WhatsApp
                    </Typography>
                    <Typography className="size14 fontOnest" sx={{ color: "var(--colorWhite)" }}>
                      +57 312 345 6789
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Correo */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  className="contact-item"
                  onClick={() => (window.location.href = "mailto:uni-tiendas@gmail.com")}
                >
                  <EmailIcon className="icon" />
                  <Box>
                    <Typography
                      className="size14 fontOnestBold"
                      sx={{ color: "var(--colorRedLight)" }}
                    >
                      Correo
                    </Typography>
                    <Typography className="size14 fontOnest" sx={{ color: "var(--colorWhite)" }}>
                      uni-tiendas@gmail.com
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Horario */}
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <Box className="contact-item no-hover">
                  <AccessTimeIcon className="icon" />
                  <Box>
                    <Typography
                      className="size14 fontOnestBold"
                      sx={{ color: "var(--colorRedLight)" }}
                    >
                      Horarios
                    </Typography>
                    <Typography className="size14 fontOnest" sx={{ color: "var(--colorWhite)" }}>
                      Lun - Vie | 7am - 6pm
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box className="footer-bottom">
          <Typography
            className="size12 fontOnest"
            sx={{ color: "var(--colorGrayDark)", mt: 8, textAlign: "center" }}
          >
            © {new Date().getFullYear()} Uni-Tiendas. Todos los derechos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
