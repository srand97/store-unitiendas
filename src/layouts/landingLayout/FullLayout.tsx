import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

// IMPORTADOS
import "./fullLayout.scss";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const FullLayout = () => {
  const location = useLocation();
  return (
    <Box className="layout">
      <Box className="header-wrapper">
        <Header />
      </Box>
      <Box className="outlet">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </Box>
      <Footer />
    </Box>
  );
};

export default FullLayout;
