import { useState } from "react";
import { Box, IconButton } from "@mui/material";

interface CarouselProps {
  images: string[];
  width?: string | number | Record<string, any>;
  height?: string | number | Record<string, any>;
  borderRadius?: string | number;
}

export default function Carousel({
  images,
  width = "800px",
  height = { xs: "300px", sm: "400px", md: "500px", lg: "600px", xl: "700px" },
  borderRadius = "0px",
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        borderRadius,
        overflow: "hidden",
        boxShadow: 3,
      }}
    >
      {/* Imagen actual */}
      <Box
        component="img"
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "0.5s ease-in-out",
        }}
      />

      {/* Indicadores */}
      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 14,
              height: 14,
              padding: 0,
              borderRadius: "50%",
              backgroundColor: index === currentIndex ? "var(--colorRed)" : "rgba(255,255,255,0.5)",
              "&:hover": {
                backgroundColor: "var(--colorRed)",
              },
              opacity: index === currentIndex ? 0.8 : 1,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
