import React from "react";
import { Box, Typography } from "@mui/material";
import { useLoadingStore } from "@/store/loadingStore";
import Loader from "@/assets/loader/Loader.gif";
import "./globalLoader.scss";

const GlobalLoader: React.FC = () => {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <Box className="global-loader">
      <img src={Loader} alt="Cargando..." />
      <Typography className="size16">Cargando...</Typography>
    </Box>
  );
};

export default GlobalLoader;
