import { useState, useCallback, useEffect, useRef } from "react";

interface UseFileHandlerOptions {
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  initialValue?: File[] | File | null;
}

export const useFileHandler = ({
  multiple = false,
  maxFiles = 5,
  maxFileSize = 10,
  initialValue = null,
}: UseFileHandlerOptions) => {
  const [files, setFiles] = useState<File[]>(() =>
    initialValue ? (Array.isArray(initialValue) ? initialValue : [initialValue]) : []
  );
  const [error, setError] = useState<string | null>(null);

  const [backgroundColor, setBackgroundColor] = useState<string>("var(--colorWhite)");

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && initialValue) {
      const normalized = Array.isArray(initialValue) ? initialValue : [initialValue];
      setFiles(normalized);
      initialized.current = true;
    }
  }, [initialValue]);

  const validateFiles = useCallback(
    (incoming: File[]) => {
      if (maxFiles && incoming.length > maxFiles) {
        return `Máximo ${maxFiles} archivos permitidos`;
      }

      const oversized = incoming.find((file) => file.size > maxFileSize * 1024 * 1024);
      if (oversized) {
        return `El archivo ${oversized.name} excede el límite de ${maxFileSize}MB`;
      }

      return null;
    },
    [maxFiles, maxFileSize]
  );

  const handleFiles = useCallback(
    (incoming: FileList | File[]) => {
      const incomingArray = Array.from(incoming);
      const validationError = validateFiles(incomingArray);
      if (validationError) {
        setError(validationError);
        return;
      }

      if (multiple) {
        const newFiles = [...files, ...incomingArray].slice(0, maxFiles);
        setFiles(newFiles);
      } else {
        setFiles(incomingArray.slice(0, 1));
      }

      setError(null);
    },
    [files, multiple, maxFiles, validateFiles]
  );

  const removeFile = useCallback(
    (index: number) => {
      const updated = [...files];
      updated.splice(index, 1);
      setFiles(updated);
    },
    [files]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setBackgroundColor("var(--backgroundGlass) !important");
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackgroundColor("rgb(220, 207, 252) !important");
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBackgroundColor("var(--backgroundGlass) !important");
  }, []);

  return {
    files,
    error,
    handleFiles,
    removeFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    backgroundColor,
  };
};
