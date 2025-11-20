import { create } from "zustand";

type AlertType = "success" | "error" | "warning" | "info" | "confirmation";

interface AlertBase {
  type: AlertType;
  icon?: React.ReactNode | string;
  iconSize?: number;
  duration?: number;
}

interface SuccessAlert extends AlertBase {
  type: "success";
  title: string;
  message: string;
}

interface ErrorAlert extends AlertBase {
  type: "error";
  title: string;
  message: string;
}

interface InfoAlert extends AlertBase {
  type: "info";
  title: string;
  message: string;
}

interface WarningAlert extends AlertBase {
  type: "warning";
  title: string;
  message: string;
}

interface ConfirmationAlert extends AlertBase {
  type: "confirmation";
  title: string;
  message: string;
  onConfirm: () => void;
  confirmName: string;
  cancelName: string;
}

type Alert = SuccessAlert | ErrorAlert | InfoAlert | WarningAlert | ConfirmationAlert;

interface AlertStore {
  alert: Alert | null;
  showAlert: (alert: Alert) => void;
  hideAlert: () => void;
  showAlertAsync: (alert: Alert) => Promise<void>;
}

export const useAlertStore = create<AlertStore>((set) => ({
  alert: null,
  showAlert: (alert) => set({ alert }),

  showAlertAsync: (alert) => {
    return new Promise((resolve) => {
      const { showAlert, hideAlert } = useAlertStore.getState();

      showAlert(alert);

      const unsubscribe = useAlertStore.subscribe((state) => {
        if (state.alert === null) {
          unsubscribe();
          resolve();
        }
      });

      if (alert.duration) {
        setTimeout(() => {
          hideAlert();
        }, alert.duration);
      }
    });
  },

  hideAlert: () => set({ alert: null }),
}));
