import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch, FiShield, FiUserX, FiUserCheck, FiTrash2 } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import { useToast } from "../../context/ToastContext";
import useAuth from "../../hooks/useAuth";
import {
  getUsers,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../../services/adminApi";
import Pagination from "../../components/admin/Pagination";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

function AdminUsers() {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionId, setActionId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        search: debouncedSearch || undefined,
        role: role || undefined,
        page,
        limit: 15,
      });
      setUsers(res.data);
      setTotalPages(res.totalPages);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, role, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, role]);

  const handleRoleToggle = async (targetUser) => {
    const newRole = targetUser.role === "admin" ? "user" : "admin";
    setActionId(targetUser._id);
    try {
      await updateUserRole(targetUser._id, newRole);
      showToast(`${targetUser.name} is now ${newRole}.`, "success");
      await fetchUsers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to update role.",
        "error"
      );
    } finally {
      setActionId(null);
    }
  };

  const handleStatusToggle = async (targetUser) => {
    const nextActive = targetUser.isActive === false;
    setActionId(targetUser._id);
    try {
      await updateUserStatus(targetUser._id, nextActive);
      showToast(
        nextActive ? "Account reinstated." : "Account suspended.",
        "success"
      );
      await fetchUsers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to update account status.",
        "error"
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmTarget) return;
    setActionId(confirmTarget._id);
    try {
      await deleteUser(confirmTarget._id);
      showToast("User deleted.", "success");
      setConfirmTarget(null);
      await fetchUsers();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to delete user.",
        "error"
      );
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Users</h1>
        <p className="text-sm text-muted mt-1">
          Manage roles and account access.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:border-forest/40"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-border rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-forest/40"
        >
          <option value="">All Roles</option>
          <option value="user">Users</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-sm py-16">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-muted text-sm py-16">
            No users found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted uppercase tracking-wide">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = u._id === currentUser?.id;
                  const busy = actionId === u._id;

                  return (
                    <tr
                      key={u._id}
                      className="border-b border-border last:border-0 hover:bg-gray-50/60"
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/admin/users/${u._id}`}
                          className="flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-forest/10 text-forest flex items-center justify-center text-xs font-semibold shrink-0">
                            {u.name?.[0]?.toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-ink truncate">
                              {u.name}
                              {isSelf && (
                                <span className="text-muted font-normal"> (You)</span>
                              )}
                            </p>
                            <p className="text-xs text-muted truncate">
                              {u.email}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge value={u.role} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          value={u.isActive === false ? "suspended" : "active"}
                        />
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleRoleToggle(u)}
                            disabled={busy || isSelf}
                            title={
                              u.role === "admin"
                                ? "Remove admin access"
                                : "Make admin"
                            }
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FiShield size={14} />
                          </button>

                          <button
                            onClick={() => handleStatusToggle(u)}
                            disabled={busy || isSelf}
                            title={
                              u.isActive === false
                                ? "Reinstate account"
                                : "Suspend account"
                            }
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-ink hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            {u.isActive === false ? (
                              <FiUserCheck size={14} />
                            ) : (
                              <FiUserX size={14} />
                            )}
                          </button>

                          <button
                            onClick={() => setConfirmTarget(u)}
                            disabled={busy || isSelf}
                            title="Delete user"
                            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <ConfirmDialog
        open={!!confirmTarget}
        title={`Delete ${confirmTarget?.name}?`}
        message="This permanently deletes their account. Their trips, reviews, and expenses will remain but will no longer be linked to a user."
        confirmLabel="Delete User"
        loading={actionId === confirmTarget?._id}
        onConfirm={handleDelete}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

export default AdminUsers;
