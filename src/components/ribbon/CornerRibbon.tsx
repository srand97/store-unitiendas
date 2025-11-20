import React from "react";
import { Box } from "@mui/material";

type CornerPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface CornerRibbonProps {
  position?: CornerPosition;
  width?: string | number;
  height?: string | number;
  primaryColor?: string;
  backgroundColor?: string;
  isBorderRadius?: boolean;
}

const CornerRibbon: React.FC<CornerRibbonProps> = ({
  position = "top-right",
  width = "30%",
  height = "50px",
  primaryColor = "var(--colorRed)",
  backgroundColor = "var(--colorWhite)",
  isBorderRadius = false,
}) => {
  const positions: Record<CornerPosition, { [key: string]: string | number }> = {
    "top-right": { top: 0, right: 0, flexDirection: "row" },
    "top-left": { top: 0, left: 0, flexDirection: "row-reverse" },
    "bottom-right": { bottom: 0, right: 0, flexDirection: "row" },
    "bottom-left": { bottom: 0, left: 0, flexDirection: "row-reverse" },
  };

  const { flexDirection, ...posStyles } = positions[position];

  const smallRadius =
    position === "top-right"
      ? "0 40px 0 0"
      : position === "top-left"
        ? "40px 0 0 0"
        : position === "bottom-left"
          ? "0 0 0 40px"
          : position === "bottom-right"
            ? "0 0 40px 0"
            : "0";

  const bigRadius =
    position === "top-right"
      ? "40px 0 0 40px"
      : position === "top-left"
        ? "0 40px 40px 0"
        : position === "bottom-left"
          ? "0 40px 40px 0"
          : position === "bottom-right"
            ? "40px 0 0 40px"
            : "0";

  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        width,
        height,
        flexDirection,
        ...posStyles,
      }}
    >
      {/* Pieza pequeña */}
      <Box
        sx={{
          backgroundColor,
          height,
          width: "8%",
        }}
      >
        <Box
          sx={{
            backgroundColor: primaryColor,
            height: "100%",
            width: "100%",
            borderRadius: smallRadius,
          }}
        />
      </Box>

      {/* Pieza grande */}
      <Box
        sx={{
          backgroundColor,
          height,
          width: "95%",
          p:
            position === "top-right"
              ? "0 0 10px 10px"
              : position === "top-left"
                ? "0 10px 10px 0"
                : position === "bottom-left"
                  ? "10px 10px 0px 0px"
                  : position === "bottom-right"
                    ? "10px 0 0 10px"
                    : "0",
          borderBottomLeftRadius: position === "top-right" ? "20px" : 0,
          borderBottomRightRadius: position === "top-left" ? "20px" : 0,
          borderTopRightRadius: position === "bottom-left" ? "20px" : 0,
          borderTopLeftRadius: position === "bottom-right" ? "20px" : 0,
        }}
      >
        <Box
          sx={{
            backgroundColor: primaryColor,
            height: "100%",
            width: "100%",
            borderRadius: isBorderRadius ? "20px" : bigRadius,
          }}
        />
      </Box>
    </Box>
  );
};

export default CornerRibbon;
