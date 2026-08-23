import { useEffect, useState } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import { getAllExpensesAdmin, deleteExpenseAdmin } from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

function AdminExpenses() {
  const { showToast } = useToast();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [busyId, setBusyId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getAllExpensesAdmin({
        search: debouncedSearch || undefined,
        page,
        limit: 15,
      });
      setExpenses(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setBusyId(confirmTarget._id);
    try {
      await deleteExpenseAdmin(confirmTarget._id);
      showToast("Expense deleted.", "success");
      setConfirmTarget(null);
      await fetchExpenses();
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to delete expense.", "error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Expenses</h1>
        <p className="text-sm text-muted mt-1">
          Across all trips — useful for support and dispute lookups.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
          <input
            type="text"
            placeholder="Search by expense title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm py-16">{error}</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">No expenses found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">Expense</th>
                  <th className="px-4 py-3 font-medium">Trip</th>
                  <th className="px-4 py-3 font-medium">Paid By</th>
                  <th className="px-4 py-3 font-medium">Participants</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense._id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{expense.title}</p>
                      <p className="text-xs text-muted">{expense.category}</p>
                    </td>
                    <td className="px-4 py-3 text-ink truncate max-w-[160px]">
                      {expense.trip?.title || "Unavailable"}
                    </td>
                    <td className="px-4 py-3 text-ink">
                      {expense.paidBy?.name || "Deleted user"}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {expense.participants?.length || 0} people
                    </td>
                    <td className="px-4 py-3 text-ink font-medium">
                      ₹{expense.amount?.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setConfirmTarget(expense)}
                          disabled={busyId === expense._id}
                          title="Delete expense"
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-40"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Delete "${confirmTarget?.title}"?`}
        message="This permanently deletes the expense. This can't be undone."
        confirmLabel="Delete Expense"
        loading={!!busyId}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminExpenses;

