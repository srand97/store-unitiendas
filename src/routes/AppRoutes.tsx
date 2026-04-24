import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { lastLocation } from "../utils/urlUtilities";
import { useDocumentTitle } from "@uidotdev/usehooks";

//IMPORTADOS
import PublicRoute from "./validateRoutes/PublicRoute";
import Landing from "@/pages/public/landing/Landing";
import Login from "@/pages/public/login/Login";
import NotFound from "@/pages/public/notFound/NotFound";
import Products from "@/pages/public/products/Products";
import FullLayout from "@/layouts/landingLayout/FullLayout";
import ProductsDetail from "@/pages/public/products/details/ProductsDetail";
// import PrivateRoute from "./validateRoutes/PrivateRoute";
import ShoppingCart from "@/pages/private/shoppingCart/ShoppingCart";

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
    {
      path: "/inicio-sesion",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      element: <FullLayout />,
      children: [
        // HOME
        {
          path: "/inicio",
          element: <Landing />,
        },
        {
          path: "/productos",
          element: <Products />,
        },
        {
          path: "/productos/:nombre",
          element: <ProductsDetail />,
        },
        {
          path: "/carrito",
          element: (
            // <PrivateRoute>
              <ShoppingCart />
            // </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

export default AppRoutes;
