import React from "react";
import { Outlet, useLocation } from "react-router";
import HomePage from "../Components/HomePage/HomePage";
import Navbar from "../Components/Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <Navbar />
      {isHomePage && <HomePage />}
      <Outlet />
    </div>
  );
};

export default Layout;
