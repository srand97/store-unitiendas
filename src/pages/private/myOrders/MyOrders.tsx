import { Box, Breadcrumbs, Chip, Divider, Link, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MainButton } from "@/components/mainButton/MainButton";
import { formatCOP, formatDate } from "@/utils/formatters";
import { useMyOrders } from "./hook/useMyOrders";
import "./myOrders.scss";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  ready: "Listo para entrega/recogida",
  delivered: "Entregado",
  picked_up: "Recogido",
  paid: "Pagado",
  cancelled: "Cancelado",
};

const FULFILLMENT_LABELS: Record<string, string> = {
  delivery: "Domicilio",
  pickup: "Recoger en punto",
};

const MyOrders = () => {
  const { orders, loading } = useMyOrders();
  const navigate = useNavigate();

  return (
    <Box className="MyOrders" sx={{ pb: 8 }}>
      <Box mb={4}>
        <Typography className="size30 fontOnestBold">Mis pedidos</Typography>
        <Breadcrumbs separator="|" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/inicio">
            Inicio
          </Link>
          <Typography color="text.primary">Mis pedidos</Typography>
        </Breadcrumbs>
      </Box>

      {loading && <Typography className="fontOnest">Cargando pedidos...</Typography>}

      {!loading && orders.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography className="size20 fontOnestBold" mb={1}>
            Aún no tienes pedidos
          </Typography>
          <Typography className="size14 fontOnest" color="text.secondary" mb={3}>
            Cuando hagas tu primera compra, aparecerá aquí.
          </Typography>
          <MainButton text="Ir a la tienda" className="btnRed" onClick={() => navigate("/productos")} />
        </Box>
      )}

      <Stack spacing={2}>
        {orders?.map((order) => (
          <Box
            key={order.id}
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              p: { xs: 2.5, md: 3 },
              border: "1px solid var(--colorBlueLight)",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1}
              mb={1.5}
            >
              <Box>
                <Typography className="size16 fontOnestBold">#{order.code}</Typography>
                <Typography className="size12" color="text.secondary">
                  {formatDate(order.created_at)} · {FULFILLMENT_LABELS[order.fulfillment_method]}
                </Typography>
              </Box>
              <Chip
                label={STATUS_LABELS[order.status] ?? order.status}
                size="small"
                sx={{ bgcolor: "var(--colorBlueLight)", fontWeight: 600 }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack spacing={0.5}>
              {order?.items?.map((item) => (
                <Box key={item.id} display="flex" justifyContent="space-between">
                  <Typography className="size14 fontOnest">
                    {item.quantity}x {item.product_name}
                  </Typography>
                  <Typography className="size14 fontOnestSemiBold">
                    {formatCOP(item.subtotal)}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Box display="flex" justifyContent="space-between">
              <Typography className="size16 fontOnestBold">Total</Typography>
              <Typography className="size16 fontOnestBold" color="var(--colorRed)">
                {formatCOP(order.total_amount)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MyOrders;
