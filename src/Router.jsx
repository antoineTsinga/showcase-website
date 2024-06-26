import React from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "./AppContext";
import Footer from "./common/Footer";
import NavbarOnix from "./common/NavbarOnix";
import Login from "./views/Auth/Login";
import Registration from "./views/Auth/Registration";
import Home from "./views/Home/Home";
import TestLogin from "./views/TestLogin";
import Account from "./views/Account/Account";
import PrivateRoute, { PrivateRouteAdmin } from "./PrivateRoute";
import Catalogue from "./views/Catalogue/Catalogue";
import Items from "./views/Items/Items";
import ManageItems from "./views/Admin/ManageItems";
import Admin from "./views/Admin/Admin";

export default function Router() {
  const { onConnect, isAdmin } = useAppContext();

  return (
    <BrowserRouter>
      {!isAdmin ? <NavbarOnix /> : null}
      <Routes>
        <Route element={<Home />} path="/" exact />

        <Route element={<Registration />} path="/Registration" exact />

        <Route element={<Login />} path="/login" exact />
        <Route element={<Catalogue />} path="/Catalogue" exact />

        {/* <Route element={<TestLogin />} path="/test" exact /> */}
        <Route
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
          path="/Account"
          exact
        />
        {/* <Route element={<TestLogin />} path="/test" exact /> */}
        <Route
          element={
            <PrivateRouteAdmin>
              <Admin />
            </PrivateRouteAdmin>
          }
          path="/Admin"
          exact
        />
        <Route
          element={
            <PrivateRoute>
              <Items />
            </PrivateRoute>
          }
          path="/Items"
          exact
        />
      </Routes>
      {!isAdmin ? <Footer /> : null}
    </BrowserRouter>
  );
}
