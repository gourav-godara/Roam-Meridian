function Avatar({ user, size = 36 }) {
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name || "Profile"}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-border"
      />
    );
  }

  return (
    <span
      style={{ width: size, height: size }}
      className="rounded-full bg-forest/10 text-forest flex items-center justify-center text-sm font-medium"
    >
      {initial}
    </span>
  );
}

export default Avatar;
