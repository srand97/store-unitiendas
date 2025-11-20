import mercado from "@/assets/images/mercado.jpg";
import caja from "@/assets/images/caja1.jpg";
import IconFactory from "@/assets/icon/IconFactory";
import IconShop from "@/assets/icon/IconShop";
import IconTruck from "@/assets/icon/IconTruck";
import IconHandshake from "@/assets/icon/IconHandshake";
import { ComponentType } from "react";

interface IconProps {
  color?: string;
  height?: number;
  width?: number;
}

interface Testimonial {
  name: string;
  role: string;
  message: string;
  rating: number;
}

export interface InfoItem {
  icon: ComponentType<IconProps>;
  title: string;
  description: string;
}

export const ArrImages = [caja, mercado];

export const ArrInfo: InfoItem[] = [
  {
    icon: IconFactory,
    title: "Proveedor",
    description:
      "Llega a tu público de interés más fácil y rápido, nosotros hacemos la gestión por ti.",
  },
  {
    icon: IconShop,
    title: "Tendero",
    description:
      "Encuentra los precios más bajos directamente con los proveedores, recuerda tenemos precios especiales por volumen.",
  },
  {
    icon: IconTruck,
    title: "Envíos",
    description:
      "Escoge el tipo de envío más conveniente para tu negocio, nuestros despachos son diarios y nuestras entregas están garantizadas.",
  },
  {
    icon: IconHandshake,
    title: "Beneficios",
    description:
      "Comunicación fácil entre tendero y proveedor, mejores precios y productos frescos seleccionados por su calidad.",
  },
  {
    icon: IconHandshake,
    title: "Atención",
    description:
      "Cada detalle importa para nosotros, benefíciate de nuestra atención personalizada y pedidos por Whatsapp.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Carlos Moreno",
    role: "Proveedor de productos de aseo",
    message:
      "Nos ayudaron a llegar directamente muchas más de tiendas sin complicaciones. Ahora vendemos más y mejor.",
    rating: 4,
  },
  {
    name: "Sandra Gutierrez",
    role: "Tendero en Soledad, Atlántico",
    message:
      "Puedo comprar más barato y ofrecer mejores precios a mis clientes. Es un cambio total.",
    rating: 5,
  },
  {
    name: "Jairo Quintero",
    role: "Proveedor de productos alimenticios",
    message:
      "Ayudan a organizar la distribución y a llegar a más tiendas sin perder tiempo. Ha sido un gran apoyo para el equipo.",
    rating: 5,
  },
];
