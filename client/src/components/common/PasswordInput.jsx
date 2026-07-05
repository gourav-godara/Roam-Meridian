import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
    label,
    placeholder,
    value,
    onChange,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">
                {label}
            </label>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-stone-300
                        bg-white
                        px-4
                        py-3
                        pr-12
                        text-slate-800
                        placeholder:text-stone-400
                        transition-all
                        duration-200
                        focus:border-[#2F5D50]
                        focus:ring-2
                        focus:ring-[#2F5D50]/20
                        focus:outline-none
                    "
                />
                
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#2F5D50] transition-colors"
                >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;