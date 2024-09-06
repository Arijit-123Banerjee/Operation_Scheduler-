import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";
import CustomButton from "@/Components/CustomButton";

const SignUpPage = () => {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    if (role === "user") {
      navigate("/userdashboard");
    } else if (role === "admin") {
      navigate("/admindashboard");
    }
  };

  return (
    <div className="background_svg">
      <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto md:h-screen p-4">
        <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-[#25bc73] lg:px-8 px-4 py-4">
            <div>
              <h4 className="text-white text-lg font-semibold">
                {role === "user" ? "Create Your Account" : "Admin Login"}
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                {role === "user"
                  ? "Welcome to our registration page! Get started by creating your account."
                  : "Log in as an administrator to manage the system and access advanced features."}
              </p>
            </div>
            <div>
              <h4 className="text-white text-lg font-semibold">
                Simple & Secure {role === "user" ? "Registration" : "Login"}
              </h4>
              <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                Our {role === "user" ? "registration" : "login"} process is
                designed to be straightforward and secure. We prioritize your
                privacy and data security.
              </p>
              <div className="mt-5 space-x-4">
                <Button
                  onClick={() => setRole("user")}
                  className={`py-2 px-4 rounded-md font-semibold ${
                    role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  User
                </Button>
                <Button
                  onClick={() => setRole("admin")}
                  className={`py-2 px-4 rounded-md font-semibold ${
                    role === "admin"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Admin
                </Button>
              </div>
            </div>
          </div>

          <form className="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-white">
            <div className="mb-6">
              <h3 className="text-gray-800 text-2xl font-bold">
                {role === "user" ? "Create an account" : "Admin Login"}
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email Id
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required=""
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required=""
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              {role === "user" && (
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      required=""
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                      placeholder="Enter name"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="!mt-12">
              <button
                className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 px-6 py-4 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
                type="button"
                onClick={handleSubmit}
              >
                {role === "user" ? "Create an account" : "Login as Admin"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
