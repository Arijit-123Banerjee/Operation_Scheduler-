import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const InputField = ({ icon: Icon, ...props }) => (
  <div className="mt-1 relative rounded-md shadow-sm">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
    />
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log

    if (!validateForm()) {
      return;
    }

    try {
      console.log("Registration data:", formData); // Debug log

      // Determine the collection based on the user's role
      const collectionName = formData.role === "admin" ? "admins" : "users";
      const selectedCollection = collection(db, collectionName);

      // Remove confirmPassword from the data to be stored
      const { confirmPassword, ...dataToStore } = formData;

      await addDoc(selectedCollection, dataToStore);
      console.log(
        `${formData.role} added successfully to ${collectionName} collection`
      );
      navigate("/", { state: { userRole: formData.role } });
    } catch (error) {
      console.error(`Error adding ${formData.role}:`, error);
      setError("Registration failed. Please try again.");
    }
  };

  const images = {
    user: "https://media.gettyimages.com/id/56724674/photo/low-angle-view-of-five-surgeons-standing-over-an-operating-table.jpg?s=612x612&w=gi&k=20&c=bFE9HoG2VqdSnTBcTFkUMrhxjbZJItGF-DpqKClhAV4=",
    admin:
      "https://i.pinimg.com/736x/80/67/a8/8067a8ec3fc96eb4b6956dd7f42ac928.jpg",
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name", icon: FaUser },
    {
      name: "email",
      type: "email",
      placeholder: "Email address",
      icon: FaEnvelope,
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      icon: FaLock,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: FaLock,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {fields.map(({ name, type, placeholder, icon }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {placeholder}
                </label>
                <InputField
                  name={name}
                  type={type}
                  placeholder={placeholder}
                  icon={icon}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUserCog className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="focus:ring-sky-500 focus:border-sky-500 block w-full pl-10 p-4 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition duration-150 ease-in-out"
            >
              Register
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-sky-600 bg-white hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <img
            src={images[formData.role]}
            alt={formData.role === "admin" ? "Admin" : "User"}
            className="w-full h-auto rounded-md shadow-md transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
