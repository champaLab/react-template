import { Assessment } from "@mui/icons-material";
import { lazy } from "react";

export const routeAdmin = [
    { group: "Admin" },
    {
        name: 'ລາຍງານ',
        path: '/app/report',
        component: lazy(() => import("../pages/app/home")),
        icon: Assessment

    },

]