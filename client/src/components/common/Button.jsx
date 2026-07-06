import { forwardRef } from "react";

const VARIANT_STYLES = {
  primary: "bg-forest text-white hover:bg-forest-hover",
  secondary: "bg-white text-ink border border-border hover:bg-gray-50",
  ghost: "bg-transparent text-ink hover:bg-gray-100",
  danger: "bg-error text-white hover:bg-[#B91C1C]",
};

const SIZE_STYLES = {
  sm: "h-10 px-4 text-sm gap-1.5",
  default: "h-12 px-6 text-base gap-2",
  lg: "h-14 px-8 text-lg gap-2.5",
};

const ICON_SIZE = {
  sm: 16,
  default: 20,
  lg: 20,
};

const Button = forwardRef(function Button(
  {
    variant = "primary",
    size = "default",
    type = "button",
    loading = false,
    disabled = false,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    children,
    onClick,
    className = "",
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;
  const iconSize = ICON_SIZE[size];

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      className={`
        inline-flex items-center justify-center rounded-2xl font-sans font-medium
        transition-all duration-[var(--duration-fast)] ease-in-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2
        active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${className}
      `}
      {...rest}
    >
      {loading ? (
        <span
          className="border-2 border-current border-t-transparent rounded-full animate-spin"
          style={{ width: iconSize - 2, height: iconSize - 2 }}
          aria-hidden="true"
        />
      ) : (
        LeftIcon && <LeftIcon size={iconSize} aria-hidden="true" />
      )}

      {children}

      {!loading && RightIcon && <RightIcon size={iconSize} aria-hidden="true" />}
    </button>
  );
});

export default Button;
