import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Register from "./features/auth/Resigter.jsx";
import Login from "./features/auth/Login.jsx";
import AdminDashboard from "./features/admin/AdminDashboard.jsx";
import Graph from "./features/admin/Components/Graph.jsx";
import Operation from "./features/admin/Components/Operation.jsx";
import Doctors from "./features/admin/Components/Doctors.jsx";
import UserDashboard from "./features/user/UserDashboard.jsx";
import UserFeature from "./features/user/UserFeature.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
    children: [
      {
        path: "/admindashboard",
        element: <Graph />,
      },
      {
        path: "/admindashboard/operations",
        element: <Operation />,
      },
      {
        path: "/admindashboard/doctors",
        element: <Doctors />,
      },
    ],
  },
  {
    path: "/userdashboard",
    element: <UserDashboard />,
    children: [{ path: "/userdashboard", element: <UserFeature /> }],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
