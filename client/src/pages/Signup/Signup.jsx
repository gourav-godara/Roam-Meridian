import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { FiUser, FiMail } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await api.post("/auth/google", {
          accessToken: tokenResponse.access_token,
        });

        login(response.data.user, response.data.token);

        navigate("/");

      } catch (error) {
        console.error(error);
        console.log("response:", error.response);
        console.log("Data:", error.response?.data);

        setError(
          error.response?.data?.message ||
          "Google login failed."
        );
      }
    },
    
    onError: () => {
      setError("Google login failed.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name: username,
        email,
      });

      if (response.data.success) {
        navigate("/verify-otp", {
          state: { email },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    googleLogin();
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
            Create Your Account
          </h1>

          <p className="mt-2 text-center text-muted">
            Join Roam Meridian and start planning your amazing adventure.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button
            variant="secondary"
            leftIcon={FcGoogle}
            className="w-full"
            onClick={handleGoogleSignup}
          >
            Continue with Google
          </Button>
          
        </div>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted">
            or sign up with email
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="Username"
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Continue
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

export default Signup;