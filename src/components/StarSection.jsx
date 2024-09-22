import {
  FaUserMd,
  FaHospital,
  FaAward,
  FaUsers,
  FaPercentage,
  FaAmbulance,
} from "react-icons/fa";

const StarSection = ({ userRole }) => {
  const regularStats = [
    { icon: FaUserMd, value: "50+", label: "Specialist Doctors" },
    { icon: FaHospital, value: "10", label: "Medical Centers" },
    { icon: FaAward, value: "25+", label: "Years of Excellence" },
    { icon: FaUsers, value: "100,000+", label: "Patients Served" },
  ];

  const adminStats = [
    { icon: FaUserMd, value: "237", label: "Number of Doctors" },
    { icon: FaUsers, value: "15,423", label: "Number of Patients" },
    { icon: FaPercentage, value: "92%", label: "Recovery Rate" },
    { icon: FaAmbulance, value: "43", label: "Active Emergencies" },
  ];

  const stats = userRole === "admin" ? adminStats : regularStats;

  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-black text-center mb-12">
          Our Healing Touch in Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-block p-4 bg-[#e0f2fe] rounded-full mb-4">
                <stat.icon className="text-[#0284c7] text-4xl" />
              </div>
              <p className="text-4xl font-bold text-black mb-2">{stat.value}</p>
              <p className="text-xl text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StarSection;
