import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

// IMPORTADOS
import "./fullLayout.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const FullLayout = () => {
  return (
    <Box className="layout">
      <Box className="header-wrapper">
        <Header />
      </Box>
      <Box className="outlet">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default FullLayout;
