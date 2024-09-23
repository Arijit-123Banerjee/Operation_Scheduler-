import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Register from "./features/auth/Resigter.jsx";
import Login from "./features/auth/Login.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import Graph from "./admin/Components/Graph.jsx";
import Operation from "./admin/Components/Operation.jsx";
import Doctors from "./admin/Components/Doctors.jsx";

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
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
