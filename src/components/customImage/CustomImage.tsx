import { useState, useEffect, useRef, memo } from "react";
import { Skeleton, Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

type CustomImageProps = {
  handleClick?: () => void;
  src?: string;
  alt?: string;
  width?: string | number | any;
  height?: string | number | any;
  minHeight?: string;
  radius?: string;
  pointer?: boolean;
  zoom?: boolean;
  boxShadow?: boolean;
  fallbackText?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

const CustomImage: React.FC<CustomImageProps> = memo(
  ({
    handleClick,
    src = "",
    alt = "Image",
    width = "100%",
    height = "100%",
    minHeight = "",
    radius = "20px", // Ajustado a tu nueva línea de diseño
    pointer = false,
    zoom = false,
    boxShadow = false,
    fallbackText = "Imagen no disponible",
    priority = false,
    objectFit = "cover",
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isInView, setIsInView] = useState(priority);
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer para Lazy Loading
    useEffect(() => {
      if (priority || !src) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: "100px" } // Carga un poco antes de entrar al viewport
      );

      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [src, priority]);

    const handleLoad = () => setIsLoaded(true);
    const handleError = () => setHasError(true);

    return (
      <Box
        ref={containerRef}
        component={motion.div}
        whileHover={zoom && !hasError ? { scale: 1.05 } : {}}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
        onClick={handleClick}
        sx={{
          position: "relative",
          width,
          height,
          minHeight,
          borderRadius: radius,
          overflow: "hidden",
          cursor: pointer ? "pointer" : "default",
          backgroundColor: hasError ? "var(--colorBlueLight)" : "transparent",
          boxShadow: boxShadow ? "0px 10px 20px rgba(0,0,0,0.05)" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Skeleton - Solo si no ha cargado y no hay error */}
        <AnimatePresence>
          {!isLoaded && !hasError && (
            <Box
              component={motion.div}
              exit={{ opacity: 0 }}
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
              }}
            >
              <Skeleton
                variant="rectangular"
                animation="wave"
                width="100%"
                height="100%"
                sx={{ bgcolor: "rgba(0,0,0,0.05)" }}
              />
            </Box>
          )}
        </AnimatePresence>

        {/* Fallback de Error */}
        {hasError || !src ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary" className="fontOnest">
              {fallbackText}
            </Typography>
          </Box>
        ) : (
          isInView && (
            <motion.img
              src={src}
              alt={alt}
              onLoad={handleLoad}
              onError={handleError}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "100%",
                height: "100%",
                objectFit,
                borderRadius: radius,
                display: hasError ? "none" : "block",
              }}
            />
          )
        )}
      </Box>
    );
  }
);

CustomImage.displayName = "CustomImage";

export default CustomImage;
