import { useState } from "react";
import { Link } from "react-router-dom";

import AuthInput from "../../components/common/AuthInput";
import PasswordInput from "../../components/common/PasswordInput";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="min-h-screen bg-[#f6f6f6] flex items-center justify-center px-4">
            <div
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    bg-white
                    shadow-xl
                    border
                    border-stone-200
                    p-8
                "
            >
                <div className="flex flex-col items-center">
                    <img
                        src="/logo.jpeg"
                        alt="Roam Meridian Logo"
                        className="h-25 w-auto mb-3"
                    />

                    <h1 className="text-3xl font-bold text-slate-900">
                        Create Your Account
                    </h1>

                    <p className="mt-2 text-center text-stone-600">
                        Join Roam Meridian and start planning your amazing adventure.
                    </p>
                </div>

                <form className="mt-8 space-y-5">

                    <AuthInput
                        label ="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <AuthInput
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="
                        w-full
                        rounded-xl
                        bg-[#2F5D50]
                        py-3
                        font-semibold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-[#24483D]
                        "
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-stone-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-semibold text-[#2F5D50] hover:text-[#8A5B34]"
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