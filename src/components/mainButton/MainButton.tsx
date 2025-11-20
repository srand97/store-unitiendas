import { Button, Tooltip } from "@mui/material";
import "./mainButton.scss";
import { JSX } from "react";

type MainButtonProps = {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  maxWidth?: boolean;
  text?: string;
  design?: "btnIndigo" | "btnWhite";
  disabled?: boolean;
  loading?: boolean;
  background?: string;
  sx?: React.CSSProperties;
  className?: string;
  textTooltip?: string;
} & React.ComponentProps<typeof Button>;
export const MainButton = ({
  iconLeft,
  iconRight,
  text,
  loading,
  disabled = false,
  maxWidth = false,
  design = "btnIndigo",
  background,
  sx,
  className = "",
  textTooltip,
  ...rest
}: MainButtonProps) => {
  const combinedClassName = `${design} ${className}`.trim();

  return (
    <Tooltip
      title={textTooltip}
      placement="top"
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "var(--colorLila)",
            color: "#fff",
            fontFamily: "Onest !important",
            borderRadius: "20px !important",
            padding: "6px 16px !important",
          },
        },
      }}
    >
      <Button
        id="mainButton"
        disabled={disabled || loading}
        className={combinedClassName}
        sx={{
          width: maxWidth ? "100%" : "max-content",
          backgroundColor: background,
          ">span": {
            display: text === "" ? "none" : "inline-flex",
          },
          "&:hover": {
            backgroundColor: rest?.color === "inherit" ? background : undefined,
            filter: rest?.color === "inherit" ? "brightness(0.95)" : undefined,
          },
          ...sx,
        }}
        {...rest}
      >
        {iconLeft}
        {text && <span>{text}</span>}
        {iconRight}
      </Button>
    </Tooltip>
  );
};
