import { useForm } from "react-hook-form";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { saveUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    // Api integration
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", data);
      localStorage.setItem("userToken", res?.data?.accessToken);
      saveUserData();
      // display nice login message
      toast.success("you are logged in successfully");
      // go to home
      navigate("/dashboard");
    } catch (error) {
      // display alert error
      toast.error("your username or password uncorrect");
      console.log(error);
    }
  };
  useEffect(() => {
    const handleUserToken = () => {
      const path = "/login";
      if (
        location.pathname === path ||
        location.pathname === "/" ||
        location.pathname === ""
      ) {
        localStorage.removeItem("userToken");
      }
    };
    handleUserToken();
  }, []);

  return (
    <>
      <div className="container-fluid login-container">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="bg-white rounded p-4">
              <div className="title text-center">
                <h3 className="app-title fs-5 mx-auto mb-4 fw-bold">
                  User Management System
                </h3>
                <span className="sign text-uppercase fw-semibold">Sign in</span>
                <p className="mt-1 mb-5 text-black-50">
                  Enter your credentials to access your account
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-details text-start">
                    <label
                      htmlFor="email"
                      className="fw-semibold text-black-50">
                      User Name
                    </label>
                    <input
                      id="email"
                      type="text"
                      className="d-block border px-2 py-1 rounded w-100 mt-1"
                      placeholder="Enter Your Email"
                      style={{ outline: "none" }}
                      {...register("username", {
                        required: "username is required!",
                      })}
                    />
                    {errors.username && (
                      <span className="text-danger d-block">
                        {errors.username.message as string}
                      </span>
                    )}
                    <label
                      htmlFor="password"
                      className="fw-semibold text-black-50 mt-3">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="d-block border px-2 py-1 rounded w-100"
                      placeholder="Enter Your Password"
                      style={{ outline: "none" }}
                      {...register("password", {
                        required: "password is required!",
                      })}
                    />
                    {errors.password && (
                      <span className="text-danger d-block ">
                        {errors.password.message as string}
                      </span>
                    )}
                  </div>
                  <button className="btn btn-warning text-white text-uppercase w-100 mt-5 mb-3">
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
