import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MiddlewareAdmin from "../middlewares/MiddlewareAdmin";
import { routeAdmin } from "../router/routeAdmin";
import { routeEmployee } from "../router/routeEmployee";
import { routeKitchen } from "../router/routeKitchen";
import { routePublic } from "../router/routePublic";
import LayoutAdmin from "./admin";
import LayoutPublic from "./public";
import MiddlewareEmployee from '../middlewares/MiddlewareEmployee';
import MiddlewareKitchen from '../middlewares/MiddlewareKitchen';

type Props = {};

const Default = (props: Props) => {
  return (
    <Routes>
      <Route element={<MiddlewareAdmin />}>
        <Route path='/app' element={<LayoutAdmin />}>
          {routeAdmin.map((route, index) => {
            return (route.path && (
              <Route
                path={route.path}
                key={route.name + index}
                element={<route.component />}
              />
            ))
          })}
        </Route>
      </Route>

      <Route element={<MiddlewareEmployee />}>
        <Route path='/app' element={<LayoutAdmin />}>
          {routeEmployee.map((route, index) => {
            return (route.path && (
              <Route
                path={route.path}
                key={route.name + index}
                element={<route.component />}
              />
            ))
          })}
        </Route>
      </Route>

      <Route element={<MiddlewareKitchen />}>
        <Route path='/app' element={<LayoutAdmin />}>
          {routeKitchen.map((route, index) => {
            return (route.path && (
              <Route
                path={route.path}
                key={route.name + index}
                element={<route.component />}
              />
            ))
          })}
        </Route>
      </Route>

      <Route path="/" element={<LayoutPublic />}>
        {routePublic.map((route, index) => {
          if (route.path) {
            return (
              <Route
                path={route.path}
                key={route.name + index}
                element={<route.component />}
              />
            )
          }
        })}
      </Route>


      <Route path="*" element={<Navigate to='/' />} />
    </Routes>

  );
};

export default Default;
