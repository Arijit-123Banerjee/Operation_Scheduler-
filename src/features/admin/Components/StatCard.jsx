const StatCard = ({ icon: Icon, color, value, name }) => {
  return (
    <div className="relative z-10 bg-white p-4 sm:p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300 ">
      <div className="flex items-center justify-between mb-2 sm:mb-4 ">
        <div className="bg-indigo-100 p-2 sm:p-3 rounded-full">
          <Icon className="text-2xl sm:text-3xl" style={{ color }} />
        </div>
        <h3
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color }}
        >
          {value}
        </h3>
      </div>
      <p className="text-gray-600 text-sm sm:text-base md:text-lg font-semibold">
        {name}
      </p>
    </div>
  );
};

export default StatCard;
