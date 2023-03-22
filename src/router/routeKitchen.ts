import { CalendarMonth, RestaurantMenu } from "@mui/icons-material";
import { lazy } from "react";

export const routeKitchen = [
    { group: "Kitchen" },
    {
        name: 'ອາຫານທີ່ສັ່ງ',
        path: '/app/orders',
        component: lazy(() => import("../pages/app/orders")),
        icon: RestaurantMenu
    }
]