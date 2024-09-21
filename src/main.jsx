import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Register from "./features/auth/Resigter.jsx";
import Login from "./features/auth/Login.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
