import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { lastLocation } from "../utils/urlUtilities";
import { useDocumentTitle } from "@uidotdev/usehooks";

//IMPORTADOS
import PublicRoute from "./validateRoutes/PublicRoute";
import Landing from "@/pages/public/landing/Landing";
import Login from "@/pages/public/login/Login";
import NotFound from "@/pages/public/notFound/NotFound";

const AppRoutes = () => {
  const location = useLocation();
  const actualLocation = lastLocation(location?.pathname);
  const title =
    location?.pathname === "*"
      ? "Página no encontrada | UniTiendas"
      : actualLocation + " | UniTiendas";
  useDocumentTitle(title);

  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={"/inicio"} />,
    },
    // LOGIN
    // LANDING PAGE
    {
      path: "/inicio",
      element: <Landing />,
    },
    {
      path: "/inicio-sesion",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

export default AppRoutes;
