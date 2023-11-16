import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../components/FormRegister";
import Layout from "../pages/LayoutBase";
import Login from "../components/FormLogin";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
