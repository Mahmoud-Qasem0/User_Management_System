import { CiSearch } from "react-icons/ci";
import {
  IoIosNotificationsOutline,
  IoMdArrowDropleftCircle,
} from "react-icons/io";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleBackstep = () => {
    const path = "/dashboard";
    if (location.pathname === path) {
      navigate(path, { replace: true });
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="container d-flex justify-content-between align-items-center py-3">
      <div className="arrow-icon">
        <IoMdArrowDropleftCircle size={20} onClick={() => handleBackstep()} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div className="search-box d-flex justify-content-center align-items-center border rounded py-1 px-3">
          <input
            id="search"
            className="border-0"
            type="search"
            placeholder="Search"
            style={{ outline: "none" }}
          />
          <CiSearch size={20} />
        </div>
        <span className="notification ms-2">
          <IoIosNotificationsOutline size={20} />
        </span>
      </div>
    </div>
  );
}

export default Navbar;
