import { MainButton } from "@/components/mainButton/MainButton";
import { Box, IconButton } from "@mui/material";
import { useAlertStore } from "@/store/alertStore";
import "./alertsComponent.scss";
import { IconError } from "@/assets/icon/IconError";
import { IconSuccess } from "@/assets/icon/IconSuccess";
import { IconInfo } from "@/assets/icon/IconInfo";
import IconWarning from "@/assets/icon/IconWarning";
import { IconX } from "@/assets/icon/IconX";

export const AlertConfirmation = () => {
  const { alert, hideAlert } = useAlertStore();
  if (!alert || alert.type !== "confirmation") return;

  const handleClose = () => {
    hideAlert();
  };

  const handleConfirm = () => {
    alert.onConfirm();
    hideAlert();
  };

  return (
    <Box className="popup-confirmation">
      {typeof alert.icon === "string" && (
        <Box className="icon-confirmation">
          <img
            style={{ height: alert.iconSize, width: alert.iconSize }}
            src={alert.icon}
            alt="Dynamic Content"
          />
        </Box>
      )}
      <Box className="alert-title">{alert.title}</Box>
      <Box className="alert-message">{alert.message}</Box>
      <Box className="alert-buttons">
        <MainButton
          text={alert.cancelName || "Cancelar"}
          onClick={handleClose}
          className="btnBack"
        />
        <MainButton text={alert.confirmName || "Confirmar"} onClick={handleConfirm} />
      </Box>
    </Box>
  );
};

export const AlertDefault = () => {
  const { alert, hideAlert } = useAlertStore();
  if (!alert) return null;

  const getIcon = () => {
    switch (alert.type) {
      case "success":
        return <IconSuccess color="#5947ff" height={40} width={40} />;
      case "error":
        return <IconError color="var(--colorRed)" height={40} width={40} />;
      case "warning":
        return <IconWarning color="#FF9A8D" height={40} width={40} />;
      case "info":
        return <IconInfo color="#2196F3" height={40} width={40} />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (alert.type) {
      case "success":
        return " #5947ff";
      case "error":
        return "var(--colorRed)";
      case "warning":
        return " #FF9A8D";
      case "info":
        return " #2196F3";
      default:
        return "#000"; // Default color
    }
  };
  return (
    <Box className="toast-wrapper">
      <Box className="toast-custom" sx={{ borderTop: `8px solid ${getColor()}` }}>
        <Box className="toast-left">{alert.icon || getIcon()}</Box>
        <Box className="toast-body">
          <Box className="toast-title" sx={{ color: getColor() }}>
            {alert.title}
          </Box>
          <Box className="toast-message">{alert.message}</Box>
        </Box>
        <IconButton onClick={hideAlert} className="toast-close">
          <IconX />
        </IconButton>
      </Box>
    </Box>
  );
};
