import { useEffect, useRef } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
// import IconUploadFile from "@/assets/icons/IconUploadFile";
// import IconPDF from "@/assets/icons/IconPDF";
// import IconJGP from "@/assets/icons/IconJGP";
// import IconPNG from "@/assets/icons/IconPNG";
// import IconTrash from "@/assets/icons/IconTrash";
// import IconDocuments from "@/assets/icons/IconDocuments";
import { MainButton } from "@/components/mainButton/MainButton";
import "./inputFile.scss";
import { useFileHandler } from "./hook/useFileHandler";

import { useAlertStore } from "@/store/alertStore";
import { getDisplayName, getSizeMB, getType, getTypeShort } from "@/utils/formatters";

interface InputFileProps {
  value: File[] | File | any | null;
  onChange: (files: File[] | File | any | null) => void;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSize?: number;
  preview?: boolean;
}
const InputFile = ({
  value,
  onChange,
  disabled = false,
  accept = "*/*",
  multiple = false,
  maxFiles = 5,
  maxFileSize = 10,
  preview = true,
}: InputFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { showAlert } = useAlertStore();

  const {
    files,
    error,
    handleFiles,
    removeFile,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    backgroundColor,
  } = useFileHandler({
    multiple,
    maxFiles,
    maxFileSize,
    initialValue: value,
  });

  // Sync with parent
  const syncWithParent = () => {
    if (multiple) {
      onChange(files.length ? files : null);
    } else {
      onChange(files[0] || null);
    }
  };

  // Sync whenever files change
  useEffect(() => {
    syncWithParent();
  }, [files]);

  const getFileIcon = (file: any) => {
    const type = getType(file);
    if (type.includes("jpeg") || type.includes("jpg")) return <IconJGP />;
    if (type.includes("pdf") || getTypeShort(file) === "pdf") return <IconPDF />;
    if (type.includes("png")) return <IconPNG />;
    if (type.includes("h5p")) return <IconDocuments />;
    return <IconDocuments />;
  };

  const handleConfirmationDelete = (index: number) => {
    showAlert({
      title: "¿Estás seguro?",
      message: "¿Deseas eliminar este archivo?",
      type: "confirmation",
      onConfirm: () => removeFile(index),
      confirmName: "Eliminar",
      cancelName: "Cancelar",
    })
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      sx={{
        border: !files.length ? "1px dashed var(--colorIndigo)" : "",
        cursor: !files.length ? "pointer" : "",
        backgroundColor,
      }}
      className="btnFile"
      onClick={() => !files.length && inputRef.current?.click()}
    >
      {preview && files.length > 0 ? (
        <Stack spacing={1} width="100%">
          {files.map((file: any, index: any) => (
            <Box key={index} className="fileItem">
              <Box className="boxItem">
                <Box>{getFileIcon(file)}</Box>
                <Box>
                  <Typography className="size12">{getDisplayName(file)}</Typography>
                  <Typography className="size11 size">{getSizeMB(file)} MB</Typography>
                </Box>
              </Box>
              <Box className="boxItem">
                <Typography className="size12 type">.{getTypeShort(file)}</Typography>
                <IconButton disabled={disabled} onClick={() => handleConfirmationDelete(index)} sx={{ cursor: "pointer" }}>
                  <IconTrash />
                </IconButton>
              </Box>
            </Box>
          ))}
          { multiple && 
          <MainButton
            onClick={() => inputRef.current?.click()}
            text="Agregar más archivos"
            className="btnWhite"
            disabled={!multiple || files.length >= maxFiles || disabled}
          />
}
        </Stack>
      ) : (
        <>
          <IconUploadFile />
          <Typography className="size12">
            <span>Busca</span> o arrastra tus archivos
          </Typography>
          <Typography className="size12">
            Archivos permitidos: {accept === "*/*" ? "Todos" : accept}
          </Typography>
          <Typography className="size12">
            {maxFileSize && `Tamaño máximo: ${maxFileSize}MB`}
          </Typography>
        </>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        disabled={disabled}
      />

      {error && (
        <Typography color="error" variant="caption">
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default InputFile;
