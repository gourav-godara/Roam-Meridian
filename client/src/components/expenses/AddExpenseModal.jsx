import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { createExpense, updateExpense } from "../../services/expenseApi";

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

  const selectedTrip = trips.find((trip) => trip._id === formData.trip);
  const tripMembers = selectedTrip
    ? [selectedTrip.createdBy, ...(selectedTrip.collaborators || [])]
    : [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpense) {
        await updateExpense(editingExpense._id, formData);
      } else {
        await createExpense(formData);
      }

      alert(
        editingExpense
          ? "Expense updated successfully!"
          : "Expense created successfully!",
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
      alert(err.response?.data?.message || "Unable to create expense.");
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
        participants: editingExpense.participants?.map((p) => p._id) ?? [],
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl my-auto">
        <div className="flex items-center justify-between border-b border-border px-6 sm:px-8 py-5 sticky top-0 bg-white rounded-t-3xl">
          <h2 className="text-xl font-semibold text-ink font-display">
            {editingExpense ? "Edit Expense" : "Add Expense"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Expense Title
              </label>
              <input
                type="text"
                placeholder="Hotel Booking"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Enter description..."
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Amount
              </label>
              <input
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                type="number"
                placeholder="5000"
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors bg-white"
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
              <label className="block text-sm font-medium text-ink mb-2">
                Trip
              </label>
              <select
                name="trip"
                value={formData.trip}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors bg-white"
              >
                <option value="">Select Trip</option>
                {trips.map((trip) => (
                  <option key={trip._id} value={trip._id}>
                    {trip.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Paid By
              </label>
              <select
                name="paidBy"
                value={formData.paidBy}
                onChange={handleChange}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-forest/40 transition-colors bg-white"
              >
                <option value="">Select Payer</option>
                {tripMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-3">
                Participants
              </label>
              <div className="grid grid-cols-2 gap-3">
                {tripMembers.map((member) => (
                  <label
                    key={member._id}
                    className="flex items-center gap-2 text-sm text-ink"
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
                            participants: formData.participants.filter(
                              (id) => id !== member._id,
                            ),
                          });
                        }
                      }}
                      className="accent-forest"
                    />
                    {member.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-ink hover:bg-mist transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-forest text-white text-sm font-semibold hover:bg-forest-dark transition-colors"
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
