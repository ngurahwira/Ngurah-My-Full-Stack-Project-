import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Register from "../components/FormRegister";
import Layout from "../pages/LayoutBase";
import Login from "../components/FormLogin";
import PageDetail from "../pages/PageDetail";

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
      {
        path: "/bid/:id",
        element: <PageDetail />,
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
