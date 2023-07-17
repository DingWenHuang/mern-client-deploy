import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./nav-component";

const Layout = (props) => {
  let { currentUser, setCurrentUser, isLoading, setIsLoading } = props;

  return (
    <>
      <Nav
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Outlet />
    </>
  );
};

export default Layout;
