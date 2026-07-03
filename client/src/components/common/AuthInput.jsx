const AuthInput = ({
    label,
    type = 'text',
    placeholder,
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-800">
                {label}
            </label>

            <input
                type={type}
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
                    text-slate-800
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-[#2F5D50]
                    focus:ring-2
                    focus:ring-[#2F5D50]/20
                    focus:outline-none
                "
            />
        </div>
    );
};

export default AuthInput;