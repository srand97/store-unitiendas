import { Box, Link, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
// IMPORTADOS
import IconLogo from "@/assets/images/IconLogo.png";
import IconChat from "@/assets/icon/IconChat";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box className="headerLogin">
      {/* Logo */}
      <Box className="logo" onClick={() => navigate("/inicio")}>
        <img src={IconLogo} alt="IconLogo" />
        <Typography>Conocenos</Typography>
      </Box>
      {/* Search e Register/Login */}
      <Box className="menuLogin">
        <Box sx={{ gap: "2rem" }}>
          <Link href="#" id="contact" className="size16">
            <IconChat />
            Contáctanos
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
