import Avatar from "../common/Avatar";

function ProfileCard({ user }) {
  return (
    <div className="flex items-center gap-3 py-4">
      <Avatar user={user} size={44} />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-ink truncate">{user.name}</p>
        <p className="text-xs text-muted truncate">{user.email}</p>
        <span className="inline-block mt-1 text-[11px] font-medium bg-forest-light/10 text-forest-light px-2 py-0.5 rounded-full">
          {user.role}
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;
