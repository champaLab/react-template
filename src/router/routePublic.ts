import { lazy } from "react";

export const routePublic = [
    {
        name: 'login',
        path: '/',
        component: lazy(() => import("../pages/public/login")),
        icon: ""
    },

]