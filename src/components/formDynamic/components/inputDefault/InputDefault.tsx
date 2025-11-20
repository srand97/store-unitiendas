import { useState } from "react";
import IconWarning from "@/assets/icon/IconWarning";
import { Box, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import { IconEyeClose, IconEyeOpen } from "@/assets/icon/IconEye";
import { IconCalendar } from "@/assets/icon/IconCalendar";
import IconTime from "@/assets/icon/IconTime";

const InputDefault = ({
  props,
  onChange,
  value,
  disabled,
  showAdvertence,
  showError,
  onBlur,
  inputRef,
  onIconClick,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const { type, placeholder, rows, className, ...otherProps } = props || {};

  const renderInput = () => {
    if (props?.type === "textarea") {
      return (
        <TextField
          multiline
          rows={rows || 4}
          fullWidth
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          size="small"
          placeholder={placeholder}
          className={className || "input-textarea"}
          disabled={disabled}
          {...otherProps}
        />
      );
    }

    if (props?.type === "password") {
      return (
        <Box sx={{ position: "relative", width: "100%" }}>
          <Input
            type={showPassword ? "text" : "password"}
            value={value ?? ""}
            onChange={onChange}
            onBlur={onBlur}
            disableUnderline
            fullWidth
            size="small"
            placeholder={placeholder}
            className={className || "input"}
            disabled={disabled}
            {...otherProps}
          />
          <Box
            onClick={() => setShowPassword(!showPassword)}
            sx={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? (
              <IconEyeOpen color="var(--colorBlack)" />
            ) : (
              <IconEyeClose color="var(--colorBlack)" />
            )}
          </Box>
        </Box>
      );
    }

    if (props?.type === "date" || props?.type === "time") {
      return (
        <Input
          type={type}
          inputRef={inputRef}
          fullWidth
          size="small"
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          className={className || "input"}
          disabled={disabled}
          placeholder={placeholder}
          {...otherProps}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onIconClick} sx={{ border: "none !important" }}>
                    {props?.type === "date" ? (
                      <IconCalendar color="var(--colorBlack)" />
                    ) : (
                      <IconTime color="var(--colorBlack)" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                "input::-webkit-calendar-picker-indicator": {
                  opacity: 0,
                  display: "none",
                },
              },
            },
          }}
        />
      );
    }

    return (
      <Input
        value={value ?? ""}
        onChange={onChange}
        onBlur={onBlur}
        disableUnderline
        fullWidth
        size="small"
        className={className || "input"}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...otherProps}
      />
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      {renderInput()}
      {showAdvertence && (
        <Box
          sx={{
            position: "absolute",
            right: "-30px",
            top: "10px",
            visibility: showError ? "visible" : "hidden",
          }}
        >
          <IconWarning />
        </Box>
      )}
    </Box>
  );
};

export default InputDefault;
