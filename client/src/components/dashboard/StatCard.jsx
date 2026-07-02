const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "bg-teal-500",
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm text-gray-500 mb-2">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-800">
            {value}
          </h2>

        </div>

        <div
          className={`${color} w-14 h-14 rounded-xl flex items-center justify-center`}
        >
          <Icon className="text-white text-2xl" />
        </div>

      </div>

    </div>
  );
};

export default StatCard;