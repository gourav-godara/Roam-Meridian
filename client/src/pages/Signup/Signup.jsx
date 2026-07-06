import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { FiUser, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call once Astha's /register endpoint exists
      login({ name: fullName, email }, "temp-token");
      navigate("/", { replace: true });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: wire to real OAuth flow once Astha's backend supports it
    console.log("Google signup clicked");
  };

  const handleAppleSignup = () => {
    // TODO: wire to real OAuth flow once Astha's backend supports it
    console.log("Apple signup clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-surface shadow-lg border border-border p-8">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Roam Meridian" className="h-16 w-auto mb-3" />
          <h1 className="font-display text-h4 text-ink">Create Your Account</h1>
          <p className="mt-2 text-center text-muted">
            Join Roam Meridian and start planning your amazing adventure.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button variant="secondary" leftIcon={FcGoogle} className="w-full" onClick={handleGoogleSignup}>
            Continue with Google
          </Button>
          <Button variant="secondary" leftIcon={FaApple} className="w-full" onClick={handleAppleSignup}>
            Continue with Apple
          </Button>
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">or sign up with email</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            iconLeft={FiUser}
            fullWidth
          />

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
            fullWidth
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
            fullWidth
          />

          <Button type="submit" variant="primary" loading={loading} className="w-full">
            Create Account
          </Button>

          <p className="text-center text-sm text-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-forest hover:text-forest-hover">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
