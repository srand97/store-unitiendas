import { Badge, Box, IconButton, Link, Menu, Popover, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";

// IMPORTADOS
import IconLogo from "@/assets/images/IconLogo.png";
import IconChat from "@/assets/icon/IconChat";
import { useAuthStore } from "@/store/authStore";
import { IconUser } from "@/assets/icon/IconUser";
import { MainButton } from "@/components/mainButton/MainButton";
import { useCartStore } from "@/store/cartStore";
import { HamburgerIcon } from "@/components/hamburger/HamburgerIcon";
import { formatCOP, getEffectivePrice } from "@/utils/formatters";

// STYLES
import "./header.scss";

const Header = () => {
  const { isAuth, logout } = useAuthStore();
  const { products, totalItems, finalTotal, removeProduct, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const home = "/inicio";

  // Estado para Menú Hamburguesa Móvil
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  // Menu usuario
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openSelectMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const closeSelectMenu = () => setAnchorEl(null);

  // Popover carrito
  const [cartAnchorEl, setCartAnchorEl] = useState<null | HTMLElement>(null);
  const cartOpen = Boolean(cartAnchorEl);
  const openCartPreview = (event: React.MouseEvent<HTMLElement>) =>
    setCartAnchorEl(event.currentTarget);
  const closeCartPreview = () => setCartAnchorEl(null);

  const handleGoToCart = () => {
    closeCartPreview();
    navigate("/carrito");
  };

  return (
    <Box className="header" sx={{ position: location.pathname === home ? "absolute" : "initial" }}>
      {/* Botón Hamburguesa (Solo visible en móviles via CSS) */}
      <Box className="mobile-menu-button">
        <IconButton onClick={toggleMobileMenu}>
          <HamburgerIcon isOpen={mobileOpen} />
        </IconButton>
      </Box>

      {/* Logo */}
      <Box className="logo" onClick={() => {
        navigate(home);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}>
        <img src={IconLogo} alt="IconLogo" />
      </Box>

      {/* Search e Register/Login */}
      <Box className="searchRegisterLogin">
        {/* Envolvamos esto en un Box que ocultaremos en móvil */}
        <Box
          className="desktop-actions"
          sx={{ display: "flex", alignItems: "center", gap: "2rem" }}
        >
          {!isAuth && (
            <Fragment>
              <Link href="/inicio-sesion" id="login" className="size16">
                Iniciar sesión
              </Link>
              <Typography
                id="register"
                className="size16"
                onClick={() => navigate("/inicio-sesion", { state: true })}
                sx={{ cursor: "pointer" }}
              >
                Únete
              </Typography>
            </Fragment>
          )}

          <Link
            href="#footer-section"
            id="contact"
            className="size16"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("footer-section")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <IconChat />
            Contáctanos
          </Link>

          {isAuth && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  sx={{ color: "black", p: 1, display: "flex", width: "100%" }}
                  className="size12"
                  text="Mis pedidos"
                  onClick={() => navigate("/mis-pedidos")}
                />
                <MainButton
                  sx={{ color: "black", p: 1 }}
                  className="size12"
                  text="Cerrar Sesión"
                  onClick={logout}
                />
              </Menu>
            </Box>
          )}
        </Box>

        {/* 🛒 El carrito SIEMPRE visible o agrupado según prefieras */}
        <IconButton id="buy" onClick={openCartPreview} sx={{ color: "white" }}>
          <Badge badgeContent={totalItems()} color="error" invisible={totalItems() === 0}>
            <ShoppingCartIcon htmlColor="#fff" />
          </Badge>
        </IconButton>
      </Box>

      {/* DRAWER MÓVIL (Menú Lateral) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop con Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 1200,
              }}
            />

            {/* Sidebar Animado */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "80%",
                maxWidth: "320px",
                height: "100vh",
                background: "var(--colorBlack)",
                zIndex: 1300,
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Botón Cerrar */}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
                <IconButton onClick={toggleMobileMenu} sx={{ color: "white" }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Navegación Principal */}
              <Box
                component={motion.nav}
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
                }}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                {/* Opción Inicio */}
                <motion.div
                  variants={{ open: { x: 0, opacity: 1 }, closed: { x: -20, opacity: 0 } }}
                  onClick={() => {
                    navigate(home);
                    toggleMobileMenu();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Typography
                    className="fontOnestBold size25"
                    sx={{ color: "white", cursor: "pointer" }}
                  >
                    Inicio
                  </Typography>
                </motion.div>

                {/* Opción Contáctanos */}
                <motion.div
                  variants={{ open: { x: 0, opacity: 1 }, closed: { x: -20, opacity: 0 } }}
                  onClick={() => {
                    toggleMobileMenu();
                    setTimeout(() => {
                      document
                        .getElementById("footer-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }, 300);
                  }}
                >
                  <Typography
                    className="fontOnestBold size25"
                    sx={{
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Contáctanos
                  </Typography>
                </motion.div>

                {isAuth ? (
                  /* Bloque para Usuario Autenticado */
                  <>
                    <Typography className="fontOnest size16" sx={{ color: "var(--colorGrayDark)" }}>
                      Mi Cuenta
                    </Typography>
                    <MainButton
                      text="Cerrar Sesión"
                      className="btnRed"
                      sx={{ width: "100%" }}
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                    />
                  </>
                ) : (
                  /* Bloque para Invitado */
                  <>
                    <MainButton
                      text="Iniciar Sesión"
                      className="btnRed"
                      sx={{ width: "100%" }}
                      onClick={() => {
                        navigate("/inicio-sesion");
                        toggleMobileMenu();
                      }}
                    />
                    <Typography
                      className="size16 fontOnest"
                      sx={{ color: "white", textAlign: "center", cursor: "pointer", mt: 1 }}
                      onClick={() => {
                        navigate("/inicio-sesion", { state: true });
                        toggleMobileMenu();
                      }}
                    >
                      ¿No tienes cuenta?{" "}
                      <span style={{ color: "var(--colorRedLight)" }}>Únete</span>
                    </Typography>
                  </>
                )}
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Popover
        open={cartOpen}
        anchorEl={cartAnchorEl}
        onClose={closeCartPreview}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              width: 320,
              borderRadius: 2,
              boxShadow: "0px 8px 24px rgba(0,0,0,0.15)",
              overflow: "hidden",
            },
          },
        }}
      >
        {/* Header del popover */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography fontWeight={700} fontSize={15}>
            Mi Carrito
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            {totalItems()} {totalItems() === 1 ? "producto" : "productos"}
          </Typography>
        </Box>

        {/* Lista de productos */}
        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
          {products.length === 0 ? (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <ShoppingCartIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
              <Typography color="text.secondary" fontSize={14}>
                Tu carrito está vacío
              </Typography>
            </Box>
          ) : (
            products.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:last-child": { borderBottom: "none" },
                }}
              >
                {/* Imagen del producto */}
                {item.image ? (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      objectFit: "cover",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 1,
                      bgcolor: "grey.100",
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* Info */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography fontSize={13} fontWeight={600} noWrap>
                    {item.name}
                  </Typography>
                  <Typography fontSize={12} color="text.secondary">
                    {formatCOP(getEffectivePrice(item?.normalPrice, item?.priceDiscount))}
                  </Typography>
                  {/* Controles cantidad */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      sx={{ p: 0.2, border: "1px solid", borderColor: "divider" }}
                    >
                      <RemoveIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                    <Typography fontSize={12} sx={{ minWidth: 20, textAlign: "center" }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      sx={{ p: 0.2, border: "1px solid", borderColor: "divider" }}
                    >
                      <AddIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                  </Box>
                </Box>

                {/* Subtotal + eliminar */}
                <Box sx={{ textAlign: "right", flexShrink: 0 }}>
                  <Typography fontSize={13} fontWeight={700}>
                    {formatCOP(getEffectivePrice(item?.normalPrice, item?.priceDiscount) * item.quantity)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => removeProduct(item.id)}
                    sx={{ color: "error.main", p: 0.3, mt: 0.5 }}
                  >
                    <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              </Box>
            ))
          )}
        </Box>

        {/* Footer con total y botón */}
        {products.length > 0 && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
              bgcolor: "grey.50",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
              <Typography fontSize={14} fontWeight={600}>
                Total
              </Typography>
              <Typography fontSize={14} fontWeight={700} color="primary">
                {formatCOP(finalTotal())}
              </Typography>
            </Box>
            <MainButton
              text="Ver carrito completo"
              onClick={handleGoToCart}
              className="btnRed"
              sx={{ width: "100%", py: 1 }}
            />
          </Box>
        )}
      </Popover>
    </Box>
  );
};

export default Header;
