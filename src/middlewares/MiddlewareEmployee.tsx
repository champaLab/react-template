import React from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store";
import Redirect from "./Redirect";
import MiddlewareKitchen from './MiddlewareKitchen';



const MiddlewareEmployee = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }))
    if ((auth && auth.isLogin && auth.role == 'admin') || (auth && auth.isLogin && auth.role == 'employee')) {
        return <Outlet />
    }
    return <MiddlewareKitchen />
}

export default MiddlewareEmployee
