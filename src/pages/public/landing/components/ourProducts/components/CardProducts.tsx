import { Box, Typography } from "@mui/material";
import CustomImage from "@/components/customImage/CustomImage";
import pastillas from "@/assets/images/pastillas.jpg"

interface CardProductProps {
  image?: string;
  title: string;
}

const CardProducts = ({ title }: CardProductProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        // minHeight: "250px",
      }}
    >
      <CustomImage src={pastillas} alt={title} radius="25px" width="100%" height="100%" />
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

export default CardProducts;
