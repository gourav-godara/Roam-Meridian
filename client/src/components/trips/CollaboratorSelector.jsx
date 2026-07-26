import { useEffect, useState } from "react";
import { searchUsers } from "../../services/userApi";

const CollaboratorSelector = ({
  collaborators,
  setCollaborators,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const users = await searchUsers(query);
        setResults(users);
      } catch (err) {
        console.error(err);
      }
    };

    const timer = setTimeout(loadUsers, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const addCollaborator = (user) => {
    if (
      collaborators.some((c) => c._id === user._id)
    )
      return;

    setCollaborators([...collaborators, user]);
    setQuery("");
    setResults([]);
  };

  const removeCollaborator = (id) => {
    setCollaborators(
      collaborators.filter((c) => c._id !== id)
    );
  };

  return (
    <div className="space-y-3">
      <label className="font-medium">
        Collaborators
      </label>

      <input
        type="text"
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        placeholder="Search users..."
        className="w-full border rounded-lg px-3 py-2"
      />

      {results.length > 0 && (
        <div className="border rounded-lg bg-white shadow">
          {results.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center px-3 py-2 border-b"
            >
              <div>
                <p>{user.name}</p>
                <p className="text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  addCollaborator(user)
                }
                className="text-teal-600 font-semibold"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {collaborators.map((user) => (
          <span
            key={user._id}
            className="bg-teal-100 px-3 py-1 rounded-full flex items-center gap-2"
          >
            {user.name}

            <button
              type="button"
              onClick={() =>
                removeCollaborator(user._id)
              }
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorSelector;