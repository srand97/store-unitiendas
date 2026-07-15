import { Navigate, useLocation, useRoutes } from "react-router-dom";
import { lastLocation } from "../utils/urlUtilities";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { AnimatePresence, motion } from "framer-motion";

//IMPORTADOS
import PublicRoute from "./validateRoutes/PublicRoute";
import Landing from "@/pages/public/landing/Landing";
import Login from "@/pages/public/login/Login";
import NotFound from "@/pages/public/notFound/NotFound";
import Products from "@/pages/public/products/Products";
import FullLayout from "@/layouts/landingLayout/FullLayout";
import ProductsDetail from "@/pages/public/products/details/ProductsDetail";
import PrivateRoute from "./validateRoutes/PrivateRoute";
import ShoppingCart from "@/pages/private/shoppingCart/ShoppingCart";
import MyOrders from "@/pages/private/myOrders/MyOrders";
import CategoryDetail from "@/pages/public/products/components/categoryDetail/CategoryDetail";

const AppRoutes = () => {
  const location = useLocation();
  const actualLocation = lastLocation(location?.pathname);

  const title =
    location?.pathname === "*"
      ? "Página no encontrada | UniTiendas"
      : actualLocation + " | UniTiendas";
  useDocumentTitle(title);

  // Definimos las rutas
  const routesElement = useRoutes([
    { path: "/", element: <Navigate to={"/inicio"} /> },
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
        { path: "/inicio", element: <Landing /> },
        { path: "/productos", element: <Products /> },
        { path: "/categoria/:slug", element: <CategoryDetail /> },
        { path: "/productos/:nombre", element: <ProductsDetail /> },
        { path: "/carrito", element: <ShoppingCart /> },
        {
          path: "/mis-pedidos",
          element: (
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          ),
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ]);

  // Si no hay rutas (fallback), no renderizamos nada
  if (!routesElement) return null;

  return (
    <AnimatePresence mode="wait">
      {/* 
        Importante: Clonamos el elemento de la ruta y le pasamos 
        la key del pathname para que Framer Motion detecte el cambio 
      */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ width: "100%" }}
      >
        {routesElement}
      </motion.div>
    </AnimatePresence>
  );
};

export default AppRoutes;
