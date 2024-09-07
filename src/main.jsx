/* eslint-disable */

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage.jsx";
import UserDashBoard from "./Pages/UserDashBoard.jsx";
import AdminDashBoard from "./Pages/AdminDashBoard.jsx";
import Card from "./Components/AdminCompoents/Card.jsx";
import OperationList from "./Components/AdminCompoents/OperationList.jsx";
import DoctorList from "./Components/AdminCompoents/DoctorList.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/userdashboard", element: <UserDashBoard /> },
  {
    path: "/admindashboard",
    element: <AdminDashBoard />,
    children: [
      { path: "", element: <Card /> }, // Default nested route for /admindashboard
      { path: "operations", element: <OperationList /> }, // Nested route for /admindashboard/operations
      { path: "doctors", element: <DoctorList /> }, // Nested route for /admindashboard/operations
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
