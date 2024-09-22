import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const InputField = ({ icon: Icon, error, ...props }) => (
  <div className="mt-1 relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
    />
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loginType, setLoginType] = useState("user");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Add form validation
    if (!formData.email || !formData.password) {
      setErrors({ login: "Please enter both email and password" });
      return;
    }

    const collectionName = loginType === "user" ? "users" : "admins";
    const q = query(
      collection(db, collectionName),
      where("email", "==", formData.email.toLowerCase().trim())
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setErrors({ login: "Invalid email or password" });
      } else {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.password === formData.password.trim()) {
          console.log(`${loginType} login successful`);
          const userInfo = {
            id: userDoc.id,
            email: userData.email,
            type: loginType,
          };
          localStorage.setItem("user", JSON.stringify(userInfo));

          if (loginType === "admin") {
            // Navigate to home page with admin props
            navigate("/", { state: { userRole: "admin" } });
          } else {
            // For regular users, just navigate to home page
            navigate("/");
          }
        } else {
          setErrors({ login: "Invalid email or password" });
        }
      }
    } catch (error) {
      console.error("Error during login: ", error);
      setErrors({ login: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setLoginType("user")}
            className={`px-4 py-2 rounded-md ${
              loginType === "user"
                ? "bg-sky-600 text-white"
                : "bg-white text-sky-600 border border-sky-600"
            }`}
          >
            User
          </button>
          <button
            onClick={() => setLoginType("admin")}
            className={`px-4 py-2 rounded-md ${
              loginType === "admin"
                ? "bg-sky-600 text-white"
                : "bg-white text-sky-600 border border-sky-600"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <InputField
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                icon={FaEnvelope}
                error={errors.email}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <InputField
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                icon={FaLock}
                error={errors.password}
              />
            </div>

            {errors.login && (
              <p className="text-sm text-red-600">{errors.login}</p>
            )}

            {/* <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-sky-600 hover:text-sky-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div> */}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
