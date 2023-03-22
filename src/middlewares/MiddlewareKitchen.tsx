import React from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store";
import Redirect from "./Redirect";



const MiddlewareKitchen = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }))
    if ((auth && auth.isLogin && auth.role == 'admin') || (auth && auth.isLogin && auth.role == 'kitchen')) {
        return <Outlet />
    }
    return <Redirect />
}

export default MiddlewareKitchen
