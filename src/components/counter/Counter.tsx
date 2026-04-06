import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

interface CounterProps {
  limit?: number;
  initialValue?: number;
  onValueChange?: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({
  limit = 10,
  initialValue = 0,
  onValueChange,
}) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    if (count < limit) {
      const newValue = count + 1;
      setCount(newValue);
      onValueChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newValue = count - 1;
      setCount(newValue);
      onValueChange?.(newValue);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          background: "var(--colorGray)",
          borderRadius: "40px",
          p: "4px",
        }}
      >
        <IconButton
          onClick={handleDecrement}
          disabled={count === 0}
          color="primary"
          sx={{ padding: "0px" }}
        >
          <RemoveIcon />
        </IconButton>

        <Box sx={{ textAlign: "center", userSelect: "none" }}>
          <Typography>{count}</Typography>
        </Box>

        <IconButton
          onClick={handleIncrement}
          disabled={count === limit}
          color="primary"
          sx={{ padding: "0px" }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
