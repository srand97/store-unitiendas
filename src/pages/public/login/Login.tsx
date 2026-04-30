import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// LAYOUTS
import AuthLayout from "@/layouts/authLayout/AuthLayout";

// IMPORTADOS
import logoSmall from "@/assets/images/logoLettersRed.png";
import logo from "@/assets/images/logo.png";
import FormAuth from "./components/FormAuth";
import FormRegister from "./components/FormRegister";
import "./login.scss";

export type state = "auth" | "register";

const formVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const Login = () => {
  const location = useLocation();
  const [state, setState] = useState<state>("auth");

  useEffect(() => {
    const stateLocation = location?.state;
    if (stateLocation) {
      setState("register");
    }
  }, [location]);

  return (
    <AuthLayout>
      <Box className="containerLogin">
        <Grid container spacing={2} className="containerLogin__grid">
          <Grid
            size={{ xs: 12, md: 6, lg: 5 }}
            className="gridChildren"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}
              className="formRegister"
            >
              <Box>
                <img
                  src={logoSmall}
                  alt="logo"
                  style={{
                    zIndex: 1,
                  }}
                  id="logoSmall"
                />
              </Box>
              <AnimatePresence mode="wait">
                {state === "register" ? (
                  <motion.div
                    key="register"
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FormRegister setActions={setState} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="auth" // 👈 key única
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <FormAuth setActions={setState} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 7 }} className="gridChildren">
            <img
              src={logo}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                zIndex: 1,
                transform: "translate(10%)",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Login;
