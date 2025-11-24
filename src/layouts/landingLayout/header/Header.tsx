import { Box, IconButton, Link, Menu, Typography } from "@mui/material";
import { Fragment, useState } from "react";

// IMPORTADOS
import IconLogo from "@/assets/images/IconLogo.png";
import IconChat from "@/assets/icon/IconChat";
import Search from "@/components/search/Search";
import "./header.scss";
import { useAuthStore } from "@/store/authStore";
import { IconUser } from "@/assets/icon/IconUser";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@/components/mainButton/MainButton";

const Header = () => {
  const { isAuth, logout } = useAuthStore();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openSelectMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeSelectMenu = () => {
    setAnchorEl(null);
  };

  const [search, setSearch] = useState<string>("");

  return (
    <Box className="header">
      {/* Logo */}
      <Box className="logo" onClick={() => navigate("/inicio")}>
        <img src={IconLogo} alt="IconLogo" />
      </Box>
      {/* Search e Register/Login */}
      <Box className="searchRegisterLogin">
        <Box>
          <Search placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
        <Box sx={{ gap: "2rem" }}>
          {!isAuth && (
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
          {isAuth && (
            <>
              <IconButton onClick={openSelectMenu} sx={{ border: "2px solid white" }}>
                <IconUser height="20" width="20" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={closeSelectMenu}
                onClick={closeSelectMenu}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "&::before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MainButton
                  sx={{ color: "black", p: 1 }}
                  className="size12"
                  text="Cerrar Sesión"
                  onClick={logout}
                />
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
