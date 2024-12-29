import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

interface User {
  id: number;
}
interface UserData {
  image: string;
  firstName: string;
  lastName: string;
  address: {
    address: string;
    city: string;
  };
  company: {
    name: string;
    title: string;
    address: {
      address: string;
      city: string;
    };
  };
  role: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
  bloodGroup: string;
}

function SideBar() {
  const { user } = useContext(AuthContext) as unknown as { user: User };
  const [userData, setUserData] = useState<UserData>({
      image: "",
      firstName: "",
      lastName: "",
      address: {
        address: "",
        city: "",
      },
      company: {
        name: "",
        title: "",
        address: {
          address: "",
          city: "",
        },
      },
      role: "",
      email: "",
      phone: "",
      birthDate: "",
      gender: "",
      bloodGroup: "",
    });

  const [isCollapse, setIsCollapse] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => setIsCollapse(!isCollapse);
  const logout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  useEffect(() => {
    if (user.id) {
      const fetchUsers = async () => {
        try {
          const res = await axios.get(`https://dummyjson.com/users/${user.id}`);
          const data = res?.data;
          setUserData(data);
        } catch (error) {
          console.log(error);
          toast.error("Failed to view user data.");
        } 
      };
      fetchUsers();
    }
  }, [user]);


  return (
    <div
      className="sidebarContainer h-100"
      style={{ backgroundColor: "#F2EAE1" }}>
      <Sidebar
        className="vh-100 "
        collapsed={isCollapse}
        style={{ backgroundColor: "#F2EAE1" }}>
        <div className="side-head">
          <h3
            className={`fw-bold text-uppercase ${
              isCollapse ? "mx-2 fs-6" : "mx-4 fs-5"
            } ps-2 my-4 d-flex align-items-center justify-content-between flex-wrap`}
            style={{ borderLeft: "5px solid #f8d442" }}>
            Ums
            {isCollapse ? (
              <FaArrowCircleRight onClick={handleToggle} size={25} />
            ) : (
              <FaArrowCircleLeft onClick={handleToggle} size={25} />
            )}
          </h3>
          <div className="personal-info text-center">
            <img
              className="mt-4 rounded-circle w-75"
              src={userData?.image}
              alt="profile image"
            />
            <h4 className={`name fw-bold ${isCollapse ? "fs-6" : "fs-5"} mt-4`}>
              {userData?.firstName} {userData?.lastName}
            </h4>
            <span className="rule" style={{ color: " #f8d442" }}>
              {userData?.role}
            </span>
          </div>
        </div>
        <Menu
          className={`d-flex flex-column justify-content-center ${
            isCollapse ? "" : "align-items-center"
          }`}>
          <MenuItem
            className="mb-2 rounded active"
            icon={<AiOutlineHome />}
            component={<Link to="/dashboard" />}>
            Home
          </MenuItem>
          <MenuItem
            className="mb-2 rounded"
            icon={<HiOutlineUsers />}
            component={<Link to="/dashboard/users-list" />}>
            Users
          </MenuItem>
          <MenuItem
            className="mb-2 rounded"
            icon={<HiOutlineUserAdd />}
            component={<Link to="/dashboard/edit-user" />}>
            Add User
          </MenuItem>
          <MenuItem
            className="rounded"
            icon={<CgProfile />}
            component={<Link to="/dashboard/profile" />}>
            Profile
          </MenuItem>
        </Menu>
        <Menu
          className={`d-flex flex-column justify-content-center ${
            isCollapse ? "" : "align-items-center"
          }`}>
          <MenuItem
            className="rounded mb-4"
            icon={<FiLogOut />}
            onClick={logout}>
            Log Out
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
export default SideBar;
