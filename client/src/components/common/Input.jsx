import { useState, useId } from "react";
import { FiEye, FiEyeOff, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const SIZE_STYLES = {
  sm: "h-10 text-sm px-3.5",
  default: "h-12 text-base px-4",
  lg: "h-14 text-lg px-5",
};

const ICON_SIZE = {
  sm: 16,
  default: 18,
  lg: 20,
};

function Input({
  label,
  type = "text",
  placeholder,
  helperText,
  error,
  success = false,
  loading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  disabled = false,
  fullWidth = false,
  size = "default",
  id,
  value,
  onChange,
  className = "",
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;

  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;
  const hasError = Boolean(error);
  const iconSize = ICON_SIZE[size];

  const borderStyle = hasError
    ? "border-error focus-within:ring-error"
    : success
    ? "border-success focus-within:ring-success"
    : "border-border focus-within:ring-forest";

  return (
    <div className={fullWidth ? "w-full" : "w-auto"}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-ink mb-1.5">
          {label}
        </label>
      )}

      <div
        className={`
          flex items-center gap-2 rounded-2xl border bg-white
          transition-all duration-[var(--duration-fast)] ease-in-out
          focus-within:ring-2 focus-within:ring-offset-2
          ${borderStyle}
          ${disabled ? "bg-gray-50 opacity-50 cursor-not-allowed" : ""}
          ${SIZE_STYLES[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
      >
        {IconLeft && <IconLeft size={iconSize} className="text-muted shrink-0" aria-hidden="true" />}

        <input
          id={inputId}
          type={resolvedType}
          placeholder={placeholder}
          disabled={disabled || loading}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          aria-describedby={helperText || error ? `${inputId}-helper` : undefined}
          className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-gray-400 text-ink disabled:cursor-not-allowed"
          {...rest}
        />

        {loading && (
          <span
            className="border-2 border-current border-t-transparent rounded-full animate-spin text-muted shrink-0"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          />
        )}

        {!loading && hasError && (
          <FiAlertCircle size={iconSize} className="text-error shrink-0" aria-hidden="true" />
        )}

        {!loading && !hasError && success && (
          <FiCheckCircle size={iconSize} className="text-success shrink-0" aria-hidden="true" />
        )}

        {!loading && !hasError && !success && isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-muted shrink-0"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={iconSize} /> : <FiEye size={iconSize} />}
          </button>
        )}

        {!loading && !hasError && !success && !isPassword && IconRight && (
          <IconRight size={iconSize} className="text-muted shrink-0" aria-hidden="true" />
        )}
      </div>

      {(helperText || error) && (
        <p id={`${inputId}-helper`} className={`text-xs mt-1.5 ${hasError ? "text-error" : "text-muted"}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}

export default Input;
