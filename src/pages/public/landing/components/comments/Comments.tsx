import { Box, Grid, IconButton, Rating, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { testimonials } from "../../utils/utils";
import IconQuotes from "@/assets/icon/IconQuotes";
import "./comments.scss";

const Comments = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const itemsToShow = window.innerWidth > 1200 ? 3 : window.innerWidth > 900 ? 2 : 1;

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <Box className="Comments">
      <Box className="Comments__header">
        <Typography className="title size50 fontOnestBold">
          Testimonios que respaldan nuestro trabajo
        </Typography>
        <Typography className="description size18 fontOnest">
          Historias reales de tenderos y proveedores que ya hacen parte de esta red.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <Box className="Comments__info-box">
            <IconQuotes height={"50px"} width={"50px"} color="var(--colorRed)" />
            <Typography className="title size30 fontOnestSemiBold">
              Historias que <br /> nos motivan
            </Typography>

            <Box className="controls">
              <IconButton onClick={handlePrev} className="btn-nav">
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleNext} className="btn-nav">
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }} sx={{ position: "relative", overflow: "hidden" }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <Grid
                container
                spacing={3}
                component={motion.div}
                key={index} // 👈 La KEY debe estar en el contenedor que envuelve el slice
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                sx={{ width: "100%" }}
              >
                {[...testimonials, ...testimonials]
                  .slice(index, index + itemsToShow)
                  .map((t, i) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={`${t.name}-${i}`}>
                      <Box className="testimonial-card">
                        <Rating
                          value={t.rating}
                          readOnly
                          sx={{ color: "var(--colorRed)", mb: 2 }}
                        />
                        <Typography className="text size15 fontOnest">“{t.message}”</Typography>
                        <Box className="user-info">
                          <Box className="avatar">{t.name.charAt(0)}</Box>
                          <Box>
                            <Typography className="name size16 fontOnestSemiBold">
                              {t.name}
                            </Typography>
                            <Typography className="role size13 fontOnest">{t.role}</Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </AnimatePresence>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Comments;
