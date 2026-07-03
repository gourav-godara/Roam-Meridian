import {
  FaMapMarkedAlt,
  FaRoute,
  FaStar,
  FaWallet,
} from "react-icons/fa";

const actions = [
  {
    title: "Explore Destinations",
    icon: FaMapMarkedAlt,
    color: "bg-blue-500",
  },
  {
    title: "Plan New Trip",
    icon: FaRoute,
    color: "bg-green-500",
  },
  {
    title: "Write Review",
    icon: FaStar,
    color: "bg-yellow-500",
  },
  {
    title: "Split Expense",
    icon: FaWallet,
    color: "bg-purple-500",
  },
];

const QuickActions = () => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-6 flex flex-col items-center justify-center gap-4"
            >
              <div
                className={`${action.color} w-14 h-14 rounded-full flex items-center justify-center text-white text-xl`}
              >
                <Icon />
              </div>

              <p className="font-medium text-center">
                {action.title}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;