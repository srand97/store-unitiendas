import { Box } from "@mui/material";
import { useEffect } from "react";
import { AlertConfirmation, AlertDefault } from "./components/AlertsComponent";
import { useAlertStore } from "@/store/alertStore";

const Alerts = () => {
  const { alert, hideAlert } = useAlertStore();

  useEffect(() => {
    if (!alert || alert.type === "confirmation") return;
    const timer = setTimeout(() => {
      hideAlert();
    }, alert.duration || 5000);
    return () => clearTimeout(timer);
  }, [alert, hideAlert]);

  if (!alert) return null;

  const getAlert = () => {
    if (!alert || !alert.type) return null;
    switch (alert.type) {
      case "confirmation":
        return <AlertConfirmation />;
      case "error":
      case "warning":
      case "info":
      case "success":
        return <AlertDefault />;

      default:
        return;
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 50,
      }}
      onClick={hideAlert}
    >
      {getAlert()}
    </Box>
  );
};

export default Alerts;
