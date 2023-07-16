import { Outlet } from "react-router-dom";
import Nav from "./nav-component";

const Layout = (props) => {
  let { currentUser, setCurrentUser } = props;
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
    </>
  );
};

export default Layout;
