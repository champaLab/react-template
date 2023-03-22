import { AddShoppingCart, Apps, BackupTable, CalendarMonth, Category, People } from "@mui/icons-material";
import { lazy } from "react";

export const routeEmployee = [
    { group: "Seller" },
    {
        name: 'ຂາຍສິນຄ້າ',
        path: '/app',
        component: lazy(() => import("../pages/app/seller")),
        icon: AddShoppingCart
    },
    { group: "Products" },
    {
        name: 'ປະເພດສິນຄ້າ',
        path: '/app/categories',
        component: lazy(() => import("../pages/app/categories")),
        icon: Category
    },
    {
        name: 'ສິນຄ້າ',
        path: '/app/product',
        component: lazy(() => import("../pages/app/product")),
        icon: Apps
    },
    { group: "Shop" },
    {
        name: 'ຂໍ້ມູໂຕະ',
        path: '/app/tables',
        component: lazy(() => import("../pages/app/table")),
        icon: BackupTable
    },
    {
        name: 'ຂໍ້ມູຜູ້ໃຊ້ງານ',
        path: '/app/users',
        component: lazy(() => import("../pages/app/user")),
        icon: People
    },
]