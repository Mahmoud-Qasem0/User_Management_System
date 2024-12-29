import { Link } from "react-router-dom";
import Notfound from "../../assets/404-not-found.png";

function NotFound() {
  return (
    <>
      <button className="btn btn-warning my-5 ms-5">
        <Link to="/dashboard" className="text-decoration-none text-white">
          Back to Dashboard
        </Link>
      </button>
      <div className="image w-100 d-flex align-items-center justify-content-center">
        <img className="img-fluid h-50 w-50" src={Notfound} alt="404" />
      </div>
      
    </>
  );
}

export default NotFound;
