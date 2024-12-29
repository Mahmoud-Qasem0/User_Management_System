import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";

function MasterLayout() {
  return (
    <>
      <div className="d-flex">
        <div className="">
          <SideBar />
        </div>
        <div className="flex-grow-1">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MasterLayout;
