import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import api from "../../services/api";
import OtpInput from "../../components/common/OtpInput";
import Button from "../../components/common/Button";

const RESEND_SECONDS = 30;

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/signup", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter the complete 6-digit OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-signup-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        navigate("/create-account", {
          state: { email },
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");

    try {
      await api.post("/auth/resend-signup-otp", {
        email,
      });

      setOtp("");
      setSecondsLeft(RESEND_SECONDS);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-surface shadow-lg border border-border p-8">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Roam Meridian"
            className="h-16 w-auto mb-3"
          />

          <h1 className="font-display text-h4 text-ink">
            Verify Your Email
          </h1>

          <p className="mt-2 text-center text-muted text-sm">
            We've sent a 6-digit OTP to
            <br />
            <span className="font-medium text-ink">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="mt-8 flex flex-col gap-5">
          <OtpInput value={otp} onChange={setOtp} />

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
            Verify & Continue
          </Button>

          <p className="text-center text-sm text-muted">
            {secondsLeft > 0 ? (
              <>Resend OTP in {secondsLeft}s</>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-semibold text-forest hover:text-forest-hover disabled:opacity-50"
              >
                {resending ? "Sending..." : "Resend OTP"}
              </button>
            )}
          </p>

          <p className="text-center text-sm text-muted">
            Wrong email?{" "}
            <Link
              to="/signup"
              className="font-semibold text-forest hover:text-forest-hover"
            >
              Go Back
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;