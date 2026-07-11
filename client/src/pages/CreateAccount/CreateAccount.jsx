import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiLock } from "react-icons/fi";

import logo from "../../assets/logo.png";
import api from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import useAuth from "../../hooks/useAuth";

const CreateAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    navigate("/signup", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/auth/create-account", {
        email,
        password,
        confirmPassword,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-surface shadow-lg border border-border p-8">

        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Roam Meridian"
            className="h-16 w-auto mb-3"
          />

          <h1 className="font-display text-h4 text-ink">
            Create Password
          </h1>

          <p className="mt-2 text-center text-muted">
            Almost done! Create a secure password for your account.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={FiLock}
            fullWidth
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            iconLeft={FiLock}
            fullWidth
          />

          {error && (
            <p className="text-sm text-error text-center">
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-forest hover:text-forest-hover"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;