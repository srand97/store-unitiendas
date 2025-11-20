import { useEffect, useRef, ReactNode } from "react";
import styles from "./modal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    isClickOverOut?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width = 400,
  height = 200,
  isClickOverOut = false
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      if(isClickOverOut){
        document.addEventListener("mousedown", handleClickOutside);
      }
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      if(isClickOverOut){
        document.removeEventListener("mousedown", handleClickOutside);
      }
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose, isClickOverOut]);

  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div
        id="global-modal-content"
        ref={modalRef}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          position: "relative",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px 0 rgba(24,27,50,0.08)",
          padding: "32px 24px 24px 24px",
          minWidth: 200,
          minHeight: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.854 12.1463C12.9005 12.1927 12.9373 12.2479 12.9625 12.3086C12.9876 12.3693 13.0006 12.4343 13.0006 12.5C13.0006 12.5657 12.9876 12.6308 12.9625 12.6915C12.9373 12.7522 12.9005 12.8073 12.854 12.8538C12.8076 12.9002 12.7524 12.9371 12.6917 12.9622C12.631 12.9874 12.566 13.0003 12.5003 13.0003C12.4346 13.0003 12.3695 12.9874 12.3088 12.9622C12.2481 12.9371 12.193 12.9002 12.1465 12.8538L8.00028 8.70691L3.85403 12.8538C3.76021 12.9476 3.63296 13.0003 3.50028 13.0003C3.3676 13.0003 3.24035 12.9476 3.14653 12.8538C3.05271 12.76 3 12.6327 3 12.5C3 12.3674 3.05271 12.2401 3.14653 12.1463L7.2934 8.00003L3.14653 3.85378C3.05271 3.75996 3 3.63272 3 3.50003C3 3.36735 3.05271 3.2401 3.14653 3.14628C3.24035 3.05246 3.3676 2.99976 3.50028 2.99976C3.63296 2.99976 3.76021 3.05246 3.85403 3.14628L8.00028 7.29316L12.1465 3.14628C12.2403 3.05246 12.3676 2.99976 12.5003 2.99976C12.633 2.99976 12.7602 3.05246 12.854 3.14628C12.9478 3.2401 13.0006 3.36735 13.0006 3.50003C13.0006 3.63272 12.9478 3.75996 12.854 3.85378L8.70715 8.00003L12.854 12.1463Z"
              fill="#181B32"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}