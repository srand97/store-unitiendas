import { Box, Typography } from "@mui/material";
import CustomImage from "@/components/customImage/CustomImage";

interface CardProductProps {
  image?: string;
  title?: string;
}

const CardCategory = ({ title, image }: CardProductProps) => {
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <CustomImage
        src={image}
        alt={title}
        width="100%"
        height={160}
        radius="25px"
        objectFit="cover"
        fallbackText="Sin imagen"
      />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <Typography
          className="size20 fontOnestSemiBold"
          sx={{
            color: "var(--colorWhite)",
            textAlign: "center",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardCategory;
