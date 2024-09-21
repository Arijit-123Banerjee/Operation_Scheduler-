import {
  FaCalendarCheck,
  FaBed,
  FaUserMd,
  FaClipboardList,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ServiceCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
  >
    <motion.div
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
      className="inline-block p-4 mb-4 bg-sky-100 rounded-full"
    >
      <Icon className="w-8 h-8 text-sky-600" />
    </motion.div>
    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ServiceSection = ({ userRole }) => {
  const isAdmin = userRole === "admin";

  const services = isAdmin
    ? [
        {
          icon: FaCalendarCheck,
          title: "Schedule Operations",
          description:
            "Efficiently manage and schedule surgeries and procedures.",
        },
        {
          icon: FaBed,
          title: "Room Management",
          description:
            "Oversee room allocations and availability across the hospital.",
        },
        {
          icon: FaUserMd,
          title: "Staff Coordination",
          description: "Coordinate medical staff schedules and assignments.",
        },
        {
          icon: FaClipboardList,
          title: "Resource Tracking",
          description: "Monitor and manage hospital resources and equipment.",
        },
      ]
    : [
        {
          icon: FaBed,
          title: "Room Booking",
          description:
            "Book rooms for your hospital stay or outpatient procedures.",
        },
        {
          icon: FaCalendarCheck,
          title: "View Appointments",
          description:
            "Check your upcoming appointments and operation schedules.",
        },
        {
          icon: FaUserMd,
          title: "Doctor Information",
          description:
            "Access information about your assigned doctors and specialists.",
        },
        {
          icon: FaClipboardList,
          title: "Medical Records",
          description:
            "View your medical history and operation details securely.",
        },
      ];

  return (
    <section
      className="py-16 bg-gradient-to-b from-gray-50 to-white"
      id="services"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {isAdmin ? "Hospital Management Services" : "Patient Services"}
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            {isAdmin
              ? "Streamline your hospital operations with our comprehensive management tools."
              : "Access your health information and manage your hospital experience with ease."}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 mt-16 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceSection;
