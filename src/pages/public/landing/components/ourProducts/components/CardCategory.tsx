import { Box, Typography } from "@mui/material";
import CustomImage from "@/components/customImage/CustomImage";
import { motion } from "framer-motion";

export const CardCategory = ({ title, image, onClick }: any) => {
  return (
    <Box
      onClick={onClick}
      component={motion.div}
      whileHover="hover"
      whileTap="hover"
      initial="rest"
      sx={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: "25px",
        touchAction: "manipulation",
        userSelect: "none",
      }}
    >
      {/* Imagen con zoom sutil al hacer hover */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <CustomImage
          src={image}
          alt={title}
          width="100%"
          height={{ xs: 120, md: 150, lg: 180 }}
          radius="25px"
          objectFit="cover"

        />
      </motion.div>

      {/* Overlay con Gradiente (más moderno que un color plano) */}
      <Box
        component={motion.div}
        variants={{
          rest: {
            opacity: 0.6,
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          },
          hover: { opacity: 1 },
        }}
        sx={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "1.5rem",
          borderRadius: "25px",
        }}
      >
        <Typography
          className="size18 fontOnestSemiBold"
          sx={{
            color: "var(--colorWhite)",
            textAlign: "center",
            textShadow: "0px 2px 4px rgba(0,0,0,0.5)",
            transform: { xs: "translateY(0)", md: "translateY(5px)" },
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
