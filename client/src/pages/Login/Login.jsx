import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectAfterLogin = () => {
    const redirectTo = location.state?.from?.pathname || "/";
    navigate(redirectTo, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      login(user, token);

      redirectAfterLogin();
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: wire to real OAuth flow once Astha's backend supports it
    console.log("Google login clicked");
  };

  const handleAppleLogin = () => {
    // TODO: wire to real OAuth flow once Astha's backend supports it
    console.log("Apple login clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-surface shadow-lg border border-border p-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Roam Meridian" className="h-16 w-auto mb-3" />
          <h1 className="font-display text-h4 text-ink">Welcome Back!</h1>
          <p className="mt-2 text-center text-muted">
            Continue exploring the world with Roam Meridian.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            variant="secondary"
            leftIcon={FcGoogle}
            className="w-full"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </Button>
          <Button
            variant="secondary"
            leftIcon={FaApple}
            className="w-full"
            onClick={handleAppleLogin}
          >
            Continue with Apple
          </Button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">or continue with email</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={FiMail}
            fullWidth
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            fullWidth
          />

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-forest hover:text-forest-hover transition-colors">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full">
            Sign In
          </Button>

          <p className="text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-forest hover:text-forest-hover">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
