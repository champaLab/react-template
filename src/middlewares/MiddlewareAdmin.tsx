import React from 'react'
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "../store";
import Redirect from "./Redirect";
import MiddlewareEmployee from './MiddlewareEmployee';



const MiddlewareAdmin = () => {
    const { auth } = useSelector((state: RootState) => ({ ...state }))
    if (auth && auth.isLogin && auth.role == 'admin') {
        return <Outlet />
    }
    return <MiddlewareEmployee />
}

export default MiddlewareAdmin
