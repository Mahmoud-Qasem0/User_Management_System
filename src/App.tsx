import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/Authlayout/AuthLayout";
import NotFound from "./components/Notfound/NotFound";
import Login from "./components/Login/Login";
import MasterLayout from "./components/Masterlayout/MasterLayout";
import Home from "./components/Home/Home";
import UsersList from "./components/Userslist/UsersList";
import EditUser from "./components/Edituser/EditUser";
import Profile from "./components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <MasterLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "users-list", element: <UsersList /> },
      { path: "edit-user", element: <EditUser /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
