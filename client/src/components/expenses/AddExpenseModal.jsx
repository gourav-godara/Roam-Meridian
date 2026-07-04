import { FaTimes } from "react-icons/fa";

const AddExpenseModal = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <h2 className="text-2xl font-bold">
            Add Expense
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            <FaTimes size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <form className="space-y-5">

  {/* Title */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Expense Title
    </label>

    <input
      type="text"
      placeholder="Hotel Booking"
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Description */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Description
    </label>

    <textarea
      rows="3"
      placeholder="Enter description..."
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Amount */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Amount
    </label>

    <input
      type="number"
      placeholder="5000"
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Category */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Category
    </label>

    <select
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <option>Accommodation</option>
      <option>Food</option>
      <option>Transport</option>
      <option>Shopping</option>
      <option>Activities</option>
      <option>Other</option>
    </select>
  </div>

  {/* Paid By */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Paid By
    </label>

    <select
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    >
      <option>Jinal</option>
      <option>Gourav</option>
      <option>Rahul</option>
    </select>
  </div>

  {/* Participants */}

  <div>

    <label className="block text-sm font-medium mb-3">
      Participants
    </label>

    <div className="grid grid-cols-2 gap-3">

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Jinal
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Gourav
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" />
        Rahul
      </label>

    </div>

  </div>

  {/* Buttons */}

  <div className="flex justify-end gap-4 pt-4">

    <button
      type="button"
      onClick={onClose}
      className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-6 py-3 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition"
    >
      Save Expense
    </button>

  </div>

</form>

        </div>

      </div>

    </div>
  );
};

export default AddExpenseModal;