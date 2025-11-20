import { Box, IconButton, Link, Typography } from "@mui/material";
import { Fragment, useState } from "react";

// IMPORTADOS
import IconLogo from "@/assets/images/IconLogo.png";
import IconChat from "@/assets/icon/IconChat";
import Search from "@/components/search/Search";
import "./header.scss";
import { useAuthStore } from "@/store/authStore";
import { IconUser } from "@/assets/icon/IconUser";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuth } = useAuthStore();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");

  return (
    <Box className="header">
      {/* Logo */}
      <Box className="logo">
        <img src={IconLogo} alt="IconLogo" />
      </Box>
      {/* Search e Register/Login */}
      <Box className="searchRegisterLogin">
        <Box>
          <Search placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <Box sx={{ gap: "2rem" }}>
          {isAuth ? (
            <IconButton onClick={() => {}} sx={{ border: "2px solid white" }}>
              <IconUser height="20" width="20" />
            </IconButton>
          ) : (
            <Fragment>
              <Link href="/inicio-sesion" id="login" className="size16">
                Iniciar sesión
              </Link>
              <Typography
                id="register"
                className="size16"
                onClick={() => navigate("/inicio-sesion", { state: true })}
              >
                Únete
              </Typography>
            </Fragment>
          )}
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
