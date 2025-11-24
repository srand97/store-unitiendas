import { useState, useEffect, useRef } from "react";
import { Skeleton, Box } from "@mui/material";

type CustomImageProps = {
  handleClick?: () => void;
  src?: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  minHeight?: string;
  radius?: string;
  pointer?: boolean;
  zoom?: boolean;
  boxShadow?: boolean;
};

const CustomImage: React.FC<CustomImageProps> = ({
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
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const shouldShowSkeleton = loading && !error;
  const shouldShowFallback = error || !src;

  useEffect(() => {
    setLoading(true);
    setError(false);

    // Verificar si la imagen ya está en caché
    if (src) {
      const img = new Image();
      img.src = src;

      if (img.complete) {
        // La imagen ya está cargada (en caché)
        setLoading(false);
      } else {
        // La imagen necesita ser cargada
        img.onload = () => setLoading(false);
        img.onerror = () => setError(true);
      }
    } else {
      setError(true);
      setLoading(false);
    }
  }, [src]);

  // Handler adicional para el evento onLoad del img element
  const handleImageLoad = () => {
    setLoading(false);
  };

  // Handler adicional para el evento onError del img element
  const handleImageError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width,
        height,
        minHeight,
        mb: 1,
        borderRadius: radius,
        overflow: "hidden",
        cursor: pointer ? "pointer" : "default",
        transition: zoom ? "transform 0.3s ease" : undefined,
        ":hover": { transform: zoom ? "scale(1.03)" : undefined },
        boxShadow: boxShadow ? "0px 4px 6px 0px rgba(29, 20, 139, 0.25)" : "none",
      }}
      onClick={handleClick}
    >
      {shouldShowSkeleton && (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ position: "absolute", top: 0, left: 0, borderRadius: radius }}
        />
      )}

      {!shouldShowFallback && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: loading ? "none" : "block",
            borderRadius: radius,
          }}
        />
      )}

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
          }}
        >
          Imagen no disponible
        </Box>
      )}
    </Box>
  );
};

export default CustomImage;
