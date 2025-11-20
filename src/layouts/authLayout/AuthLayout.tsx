import { Box } from "@mui/material";
import Header from "./header/Header";
import "./authLayout.scss";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="AuthLayout">
      {/* HEADER */}
      <Header />

      {children}
    </Box>
  );
};

export default AuthLayout;
