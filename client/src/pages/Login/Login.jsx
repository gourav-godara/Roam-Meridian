import { useState } from "react";
import { Link } from "react-router-dom";

import AuthInput from "../../components/common/AuthInput";
import PasswordInput from "../../components/common/PasswordInput";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
                        Welcome Back!
                    </h1>

                    <p className="mt-2 text-center text-stone-600">
                        Continue exploring the world with Roam Meridian.
                    </p>
                </div>

                <form className="mt-8 space-y-5">
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

                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-[#2F5D50] hover:text-[#A97142] transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

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
                        Sign In
                    </button>

                    <p className="text-center text-sm text-stone-600">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-[#2F5D50] hover:text-[#8A5B34]"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;