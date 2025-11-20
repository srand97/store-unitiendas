import { Box, Grid } from "@mui/material";

// LAYOUTS
import AuthLayout from "@/layouts/authLayout/AuthLayout";

// IMPORTADOS
import "./login.scss";
// import CornerRibbon from "@/components/ribbon/CornerRibbon";
import logoSmall from "@/assets/images/logoLettersRed.png";
import logo from "@/assets/images/logo.png";
import FormAuth from "./components/FormAuth";
import { useEffect, useState } from "react";
import FormRegister from "./components/FormRegister";
import { useLocation } from "react-router-dom";

export type state = "auth" | "register";

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
        {/* STYLE CORNER RIBBON */}
        {/* <CornerRibbon position="bottom-left" primaryColor="var(--colorBlueLight)" width={"50%"} /> */}
        {/* <------> */}
        {/* GRID DAD */}
        {/* <------> */}
        <Grid container className="containerLogin__grid">
          {/* <----------------> */}
          {/* LOGIN AND REGISTER */}
          {/* <----------------> */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }} className="gridChildren">
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
              <img src={logoSmall} alt="logo" style={{ margin: "2rem 0" }} id="logoSmall" />
              {state === "register" ? (
                <FormRegister setActions={setState} />
              ) : state === "auth" ? (
                <FormAuth setActions={setState} />
              ) : null}
            </Box>
          </Grid>
          {/* <--> */}
          {/* LOGO */}
          {/* <--> */}
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
