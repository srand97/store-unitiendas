import { useState, useEffect, useRef, memo } from "react";
import { Skeleton, Box } from "@mui/material";

type CustomImageProps = {
  handleClick?: () => void;
  src?: string;
  alt?: string;
  width?: string | number | Record<string, any>;
  height?: string | number | Record<string, any>;
  minHeight?: string;
  radius?: string;
  pointer?: boolean;
  zoom?: boolean;
  boxShadow?: boolean;
  fallbackText?: string;
  priority?: boolean; // Para imágenes que deben cargarse prioritariamente
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
};

const CustomImage: React.FC<CustomImageProps> = memo(
  ({
    handleClick,
    src = "",
    alt = "Image",
    width = "100%",
    height = "",
    minHeight = "",
    radius = "30px",
    pointer = false,
    zoom = false,
    boxShadow = false,
    fallbackText = "Imagen no disponible",
    priority = false,
    objectFit = "contain",
  }) => {
    const [loading, setLoading] = useState(!priority); // Si es priority, asumimos que no necesitamos mostrar skeleton
    const [error, setError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const [isVisible, setIsVisible] = useState(priority); // Si es priority, consideramos que ya es visible

    const shouldShowSkeleton = loading && !error && !priority;
    const shouldShowFallback = error || !src;

    // Configurar Intersection Observer para lazy loading
    useEffect(() => {
      if (priority || !src) {
        setIsVisible(true);
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observerRef.current?.disconnect();
            }
          });
        },
        {
          rootMargin: "50px", // Comienza a cargar 50px antes de que sea visible
          threshold: 0.1,
        }
      );

      if (imgRef.current) {
        observerRef.current.observe(imgRef.current);
      }

      return () => {
        observerRef.current?.disconnect();
      };
    }, [src, priority]);

    // Manejar la carga de la imagen
    useEffect(() => {
      if (!isVisible || !src) {
        if (!src) setError(true);
        return;
      }

      setLoading(true);
      setError(false);

      const img = new Image();
      img.src = src;

      if (img.complete) {
        setLoading(false);
      } else {
        img.onload = () => {
          setLoading(false);
        };
        img.onerror = () => {
          setError(true);
          setLoading(false);
        };
      }

      // Cleanup
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src, isVisible]);

    // Handlers
    const handleImageLoad = () => {
      setLoading(false);
    };

    const handleImageError = () => {
      setError(true);
      setLoading(false);
    };

    // Estilos base
    const boxStyles = {
      position: "relative" as const,
      width: width || "-webkit-fill-available",
      height,
      minHeight,
      mb: 1,
      borderRadius: radius,
      overflow: "hidden",
      cursor: pointer ? "pointer" : "default",
      transition: zoom ? "transform 0.3s ease" : undefined,
      ":hover": { transform: zoom ? "scale(1.03)" : undefined },
      boxShadow: boxShadow ? "0px 4px 6px 0px rgba(29, 20, 139, 0.25)" : "none",
      backgroundColor: "#f5f5f5", // Color de fondo mientras carga
    };

    return (
      <Box sx={boxStyles} onClick={handleClick} ref={imgRef}>
        {/* Skeleton durante la carga */}
        {shouldShowSkeleton && (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: radius,
            }}
          />
        )}

        {/* Imagen real */}
        {isVisible && !shouldShowFallback && (
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={priority ? "eager" : "lazy"} // lazy loading nativo
            style={{
              width: "100%",
              height: "100%",
              objectFit,
              display: loading ? "none" : "block",
              borderRadius: radius,
            }}
          />
        )}

        {/* Fallback cuando hay error */}
        {shouldShowFallback && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f0f0",
              color: "#999",
              fontSize: "14px",
              borderRadius: radius,
              p: 2,
              textAlign: "center",
            }}
          >
            {fallbackText}
          </Box>
        )}
      </Box>
    );
  }
);

// Display name para debugging
CustomImage.displayName = "CustomImage";

export default CustomImage;
