import { useState } from "react";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import {
  createExpense,
  updateExpense,
} from "../../services/expenseApi";

const AddExpenseModal = ({
    isOpen,
    onClose,
    refreshExpenses,
    editingExpense,
    trips = [],
}) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    category: "Accommodation",

    trip: "",
    paidBy: "",
    participants: [],
});
const selectedTrip = trips.find(
    (trip) => trip._id === formData.itinerary
);
const tripMembers = selectedTrip
    ? [
        selectedTrip.createdBy,
        ...(selectedTrip.collaborators || []),
      ]
    : [];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (editingExpense) {
  await updateExpense(editingExpense._id, formData);
} else {
  await createExpense(formData);
}

alert(
  editingExpense
    ? "Expense updated successfully!"
    : "Expense created successfully!"
);
      if (refreshExpenses) {
        await refreshExpenses();
      }

      onClose();

      setFormData({
  title: "",
  description: "",
  amount: "",
  category: "Accommodation",
  trip: "",
  paidBy: "",
  participants: [],
});

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Unable to create expense."
      );
    }
  };
 /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
  if (!isOpen) return;

  if (editingExpense) {
    setFormData({
      title: editingExpense.title ?? "",
      description: editingExpense.description ?? "",
      amount: editingExpense.amount ?? "",
      category: editingExpense.category ?? "Accommodation",
      trip: editingExpense.trip?._id ?? "",
      paidBy: editingExpense.paidBy?._id ?? "",
      participants:
        editingExpense.participants?.map((p) => p._id) ?? [],
    });
  } else {
    setFormData({
      title: "",
      description: "",
      amount: "",
      category: "Accommodation",
      trip: "",
      paidBy: "",
      participants: [],
    });
  }
}, [isOpen, editingExpense]);
/* eslint-disable react-hooks/set-state-in-effect */
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-5">

          <h2 className="text-2xl font-bold">
  {editingExpense ? "Edit Expense" : "Add Expense"}
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

          <form
    className="space-y-5"
    onSubmit={handleSubmit}
>

  {/* Title */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Expense Title
    </label>

    <input
      type="text"
      placeholder="Hotel Booking"
      name="title"
    value={formData.title}
    onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
    />
  </div>

  {/* Description */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Description
    </label>

    <textarea
      name="description"
    value={formData.description}
    onChange={handleChange}
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
      name="amount"
    value={formData.amount}
    onChange={handleChange}
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
    name="category"
    value={formData.category}
    onChange={handleChange}
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
    <div>
    <label className="block text-sm font-medium mb-2">
        Trip
    </label>

    <select
        name="itinerary"
        value={formData.itinerary}
        onChange={handleChange}
        className="w-full border rounded-xl px-4 py-3"
    >
        <option value="">Select Trip</option>

        {trips.map((trip) => (
            <option key={trip._id} value={trip._id}>
                {trip.title}
            </option>
        ))}
    </select>
</div>
  {/* Paid By */}

  <div>
    <label className="block text-sm font-medium mb-2">
      Paid By
    </label>

      <select
    name="paidBy"
    value={formData.paidBy}
    onChange={handleChange}
    className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
>
    <option value="">Select Payer</option>

    {tripMembers.map((member) => (
        <option
            key={member._id}
            value={member._id}
        >
            {member.name}
        </option>
    ))}
</select>
  </div>

  {/* Participants */}

  <div>

    <label className="block text-sm font-medium mb-3">
      Participants
    </label>

    <div className="grid grid-cols-2 gap-3">

      {tripMembers.map((member) => (
    <label
        key={member._id}
        className="flex items-center gap-2"
    >
        <input
            type="checkbox"
            checked={formData.participants.includes(member._id)}
            onChange={(e) => {
                if (e.target.checked) {
                    setFormData({
                        ...formData,
                        participants: [
                            ...formData.participants,
                            member._id,
                        ],
                    });
                } else {
                    setFormData({
                        ...formData,
                        participants:
                            formData.participants.filter(
                                (id) => id !== member._id
                            ),
                    });
                }
            }}
        />

        {member.name}
    </label>
))}
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
      {editingExpense ? "Update Expense" : "Save Expense"}
    </button>

  </div>

</form>

        </div>

      </div>

    </div>
  );
};

export default AddExpenseModal;