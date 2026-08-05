import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShield,
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiBriefcase,
  FiStar,
  FiDollarSign,
} from "react-icons/fi";
import { useToast } from "../../context/ToastContext";
import useAuth from "../../hooks/useAuth";
import {
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,
} from "../../services/adminApi";
import StatusBadge from "../../components/admin/StatusBadge";
import StatCard from "../../components/admin/StatCard";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isSelf = id === currentUser?.id;

  const load = async () => {
    setLoading(true);
    try {
      const res = await getUserById(id);
      setUser(res.data.user);
      setActivity(res.data.activity);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load this user.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleRoleToggle = async () => {
    const newRole = user.role === "admin" ? "user" : "admin";
    setBusy(true);
    try {
      await updateUserRole(id, newRole);
      showToast(`${user.name} is now ${newRole}.`, "success");
      await load();
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to update role.", "error");
    } finally {
      setBusy(false);
    }
  };

  const handleStatusToggle = async () => {
    const nextActive = user.isActive === false;
    setBusy(true);
    try {
      await updateUserStatus(id, nextActive);
      showToast(nextActive ? "Account reinstated." : "Account suspended.", "success");
      await load();
    } catch (err) {
      showToast(
        err.response?.data?.message || "Unable to update account status.",
        "error"
      );
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await deleteUser(id);
      showToast("User deleted.", "success");
      navigate("/admin/users");
    } catch (err) {
      showToast(err.response?.data?.message || "Unable to delete user.", "error");
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-forest/20 border-t-forest rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-24">
        <p className="text-red-600 text-sm">{error || "User not found."}</p>
        <Link to="/admin/users" className="text-forest text-sm mt-3 inline-block">
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <Link
        to="/admin/users"
        className="flex items-center gap-2 text-sm text-muted hover:text-ink w-fit"
      >
        <FiArrowLeft size={15} /> Back to Users
      </Link>

      <div className="bg-white rounded-2xl border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-forest/10 text-forest flex items-center justify-center text-xl font-semibold shrink-0">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-xl text-ink">{user.name}</h1>
            <p className="text-sm text-muted">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge value={user.role} />
              <StatusBadge value={user.isActive === false ? "suspended" : "active"} />
            </div>
          </div>
        </div>

        {!isSelf && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRoleToggle}
              disabled={busy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-ink hover:bg-gray-50 disabled:opacity-60"
            >
              <FiShield size={14} />
              {user.role === "admin" ? "Remove Admin" : "Make Admin"}
            </button>

            <button
              onClick={handleStatusToggle}
              disabled={busy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-ink hover:bg-gray-50 disabled:opacity-60"
            >
              {user.isActive === false ? <FiUserCheck size={14} /> : <FiUserX size={14} />}
              {user.isActive === false ? "Reinstate" : "Suspend"}
            </button>

            <button
              onClick={() => setConfirmDelete(true)}
              disabled={busy}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={FiBriefcase} label="Trips Created" value={activity.tripCount} accent="blue" />
        <StatCard icon={FiStar} label="Reviews Written" value={activity.reviewCount} accent="gold" />
        <StatCard icon={FiDollarSign} label="Expenses Logged" value={activity.expenseCount} accent="forest" />
      </div>

      <div className="bg-white rounded-2xl border border-border p-6">
        <h2 className="text-sm font-semibold text-ink mb-4">Account Details</h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-sm">
          <div>
            <dt className="text-muted text-xs mb-0.5">Auth Provider</dt>
            <dd className="text-ink capitalize">{user.authProvider}</dd>
          </div>
          <div>
            <dt className="text-muted text-xs mb-0.5">Joined</dt>
            <dd className="text-ink">
              {new Date(user.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </dd>
          </div>
          <div>
            <dt className="text-muted text-xs mb-0.5">Date of Birth</dt>
            <dd className="text-ink">
              {user.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString()
                : "Not provided"}
            </dd>
          </div>
          <div>
            <dt className="text-muted text-xs mb-0.5">Wishlist Items</dt>
            <dd className="text-ink">{user.wishlist?.length || 0}</dd>
          </div>
        </dl>
      </div>

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete ${user.name}?`}
        message="This permanently deletes their account. Their trips, reviews, and expenses will remain but will no longer be linked to a user."
        confirmLabel="Delete User"
        loading={busy}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}

export default AdminUserDetail;
