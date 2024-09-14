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
import PatientsPage from "./Pages/PatientsPage.jsx";
import { EmergenciesPage } from "./Pages/EmergenciesPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "/userdashboard", element: <UserDashBoard /> },
  {
    path: "/admindashboard",
    element: <AdminDashBoard />,
    children: [
      { path: "", element: <Card /> },
      { path: "operations", element: <OperationList /> },
      { path: "doctors", element: <DoctorList /> },
      { path: "patients", element: <PatientsPage /> },
      { path: "emergency", element: <EmergenciesPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
