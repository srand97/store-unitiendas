import { Box, Grid, IconButton, Rating, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./comments.scss";
import { testimonials } from "../../utils/utils";
import { useState } from "react";
import IconQuotes from "@/assets/icon/IconQuotes";

const Comments = () => {
  const [index, setIndex] = useState<number>(0);

  const handlePrev = () => {
    setIndex((prev: number) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev: number) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box className="Comments__container">
      {/* TITLE */}
      <Box sx={{ width: "30%" }}>
        <Typography className="title size40 fontOnestSemiBold" mb={2}>
          Testimonios que respaldan nuestro trabajo
        </Typography>
        <Typography className="description size16 fontOnest" mb={8}>
          Historias reales de tenderos y proveedores que ya hacen parte de esta red que crece cada
          día.
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={3}>
          {/* Columna izquierda con título y flechas */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Box className="Comments__box">
              <IconQuotes height={"50px"} width={"50px"} />
              <Typography className="title size40 fontOnestSemiBold">
                Historias que <br /> nos motivan a seguir
              </Typography>
              <Box sx={{ position: "absolute", bottom: 20, right: 20 }}>
                <IconButton onClick={handlePrev} size="small">
                  <ArrowBackIosNewIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={handleNext} size="small">
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Tarjetas de testimonios */}
          {testimonials.slice(index, index + 3).map((t, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={i}>
              <Box className="Comments__boxs">
                <Rating value={t.rating} readOnly size="medium" sx={{ color: "var(--colorRed)" }} />
                <Typography className="description size16 fontOnest" sx={{ mt: 2, mb: 2 }}>
                  “{t.message}”
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Box
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#90a4ae",
                    }}
                  />
                  <Box>
                    <Typography className="title size16 fontOnest">{t.name}</Typography>
                    <Typography className="description size13 fontOnest">{t.role}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Comments;
