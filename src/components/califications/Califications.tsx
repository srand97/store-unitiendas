import { useState } from "react";
import IconStarOutline from "@/assets/icon/IconStarOutline";
import { IconButton } from "@mui/material";
import IconStar from "@/assets/icon/IconStar";

interface ICalification {
  value: number; // Número de estrellas a mostrar (0-5)
  setValue?: (value: number) => void; // Función opcional para actualizar
  readOnly?: boolean; // Modo solo lectura
  size?: "small" | "medium" | "large"; // Tamaño opcional
}

const Califications = ({ value, setValue, readOnly = false, size = "medium" }: ICalification) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) {
      setHoverValue(index);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const handleClick = (index: number) => {
    if (!readOnly && setValue) {
      setValue(index + 1);
    }
  };

  // Determinar el valor a mostrar (hover o el actual)
  const displayValue = hoverValue !== null ? hoverValue + 1 : value;

  // Tamaños para los iconos
  const iconSizes = {
    small: 20,
    medium: 30,
    large: 40,
  };

  const iconSize = iconSizes[size];

  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[...Array(5)].map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= displayValue;

        return (
          <IconButton
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            disabled={readOnly}
            sx={{
              padding: size === "small" ? "3px" : size === "medium" ? "8px 5px" : "8px",
              cursor: readOnly ? "default" : "pointer",
              "&:hover": {
                backgroundColor: readOnly ? "transparent" : "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            {isFilled ? (
              <IconStar width={iconSize} height={iconSize} />
            ) : (
              <IconStarOutline
                width={iconSize}
                height={iconSize}
                color={readOnly ? "#E0E0E0" : "#757575"}
              />
            )}
          </IconButton>
        );
      })}
      <div style={{ display: "flex", alignItems: "center", margin: "0px 10px" }}>
        <p style={{ fontSize: "14px", color: "#757575" }}>{displayValue} de 5</p>
      </div>
    </div>
  );
};

export default Califications;
