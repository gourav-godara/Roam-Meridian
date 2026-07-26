import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import logo from "../../assets/logo.png";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [step, setStep] = useState(1);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    

    const navigate = useNavigate();

    const handleSendOTP = async (e) =>  {
        try {
            const response = await api.post("/auth/forgot-password", {
                email,
            });

            console.log(response.data);

            setStep(2);

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to send OTP."
            );
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await api.post(
                "/auth/verify-forgot-otp",
                {
                    email,
                    otp,
                }
            );

            console.log(response.data);

            setStep(3);

        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid OTP."
            );
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await api.post(
                "/auth/reset-password",
                {
                    email,
                    newPassword,
                }
            );

            console.log(response.data);

            alert("Password reset successfully.");

            navigate("/login");

        } catch (err) {
            setError(
                err.response?.data?.message || "Failed to reset password."
            );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            if(step === 1) {
                await handleSendOTP();
            } else if (step === 2) {
                await handleVerifyOTP();
            } else {
                await handleResetPassword();
            }
        } finally {
            setLoading(false);
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

                    <h1 className="text-2xl font-bold text-center">
                        Forgot Password
                    </h1>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 mt-8"
                >
                    {step === 1 && (
                        <>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error}
                                fullWidth
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                            >
                                Send OTP
                            </Button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Input
                                label="Email"
                                value={email}
                                disabled
                                fullWidth
                            />

                            <Input
                                label="OTP"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                error={error}
                                fullWidth
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                            >
                                Verify OTP
                            </Button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Input
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                fullWidth
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(
                                        e.target.value
                                    )
                                }
                                error={error}
                                fullWidth
                            />

                            <Button
                                type="submit"
                                loading={loading}
                                className="w-full"
                            >
                                Reset Password
                            </Button>
                        </>
                    )}

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;