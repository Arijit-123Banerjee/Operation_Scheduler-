import { FaCalendarAlt, FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = ({ userRole }) => {
  const isAdmin = userRole === "admin";
  const isUser = userRole === "user";
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleNavigation = () => {
    if (isAdmin) {
      navigate("/admindashboard");
    } else if (isUser) {
      navigate("/userdashboard");
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="text-base font-semibold tracking-wider text-sky-600 uppercase">
                {isAdmin ? "Admin Portal" : isUser ? "User Portal" : "Welcome"}
              </p>
              <h1 className="mt-4 text-3xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-6xl">
                {isAdmin
                  ? "Manage Operation Schedules"
                  : isUser
                  ? "Access Your Health Information"
                  : "Hospital Management System"}
              </h1>
              <p className="mt-4 text-xl text-sky-800 lg:mt-8">
                {isAdmin
                  ? "Efficiently schedule operations and manage hospital resources."
                  : isUser
                  ? "View your operation details, book rooms, and see available doctors."
                  : "Please log in to access your portal."}
              </p>
              {(isAdmin || isUser) && (
                <div className="mt-8 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleNavigation}
                    className="inline-flex items-center px-6 py-4 font-semibold text-white transition-all duration-200 bg-sky-600 rounded-md hover:bg-sky-700 focus:bg-sky-700"
                    role="button"
                  >
                    {isAdmin ? "Schedule Operations" : "Book Room"}
                    <FaCalendarAlt className="w-5 h-5 ml-3" />
                  </button>
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-4 font-semibold text-sky-700 transition-all duration-200 bg-sky-100 rounded-md hover:bg-sky-200 focus:bg-sky-200"
                    role="button"
                  >
                    {isAdmin ? "Manage Resources" : "View Operation Details"}
                    <FaInfoCircle className="w-5 h-5 ml-3" />
                  </a>
                </div>
              )}
              {(isAdmin || isUser) && (
                <p className="mt-5 text-gray-600">
                  {isAdmin ? "View as user? " : "Are you an admin? "}
                  <Link
                    to={"/login"}
                    title=""
                    className="text-black transition-all duration-200 hover:underline"
                  >
                    Switch role
                  </Link>
                </p>
              )}
            </div>
            <div>
              <img
                className="w-full rounded-lg shadow-xl"
                src={
                  isAdmin
                    ? "https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    : "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                }
                alt={
                  isAdmin ? "Hospital Operating Room" : "Patient Consultation"
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
