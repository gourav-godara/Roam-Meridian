import { FaBell, FaSearch, FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">

        {/* Search */}
        <div className="relative w-full max-w-xl">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search destinations, trips..."
            className="w-full rounded-xl border border-gray-200 py-3 pl-12 pr-4 outline-none focus:border-teal-500"
          />

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Notification */}
          <button className="relative">

            <FaBell className="text-2xl text-gray-600" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
              3
            </span>

          </button>

          {/* User */}
          <button className="flex items-center gap-3">

            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="w-11 h-11 rounded-full"
            />

            <div className="text-left">

              <h3 className="font-semibold text-gray-800">
                Jinal Patel
              </h3>

              <p className="text-sm text-gray-500">
                Traveller
              </p>

            </div>

            <FaChevronDown className="text-gray-500" />

          </button>

        </div>

      </div>
    </header>
  );
};

export default Navbar;