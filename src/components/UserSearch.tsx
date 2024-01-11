import { useEffect, useState } from 'react';
import { useUsers } from '../hooks/useUsers';

function UserSearch({ onChange }: { onChange: (user: string) => void }) {
  const { search, data: users, loading } = useUsers();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (user: string) => {
    onChange(user);
    setShowDropdown(false);
  };

  useEffect(() => {
    setShowDropdown(!!users.length || loading);
  }, [users, loading]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Github username"
        className="border border-gray-300 rounded-md px-4 py-2"
        onChange={(e) => search(e.target.value)}
      />
      {showDropdown && (
        <div className="absolute top-10 left-0 bg-neutral-900 w-full border-solid border-white border-2 rounded shadow-lg shadow-slate-50">
          {loading ? (
            <p className="px-4 py-2">Loading...</p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center cursor-pointer hover:bg-neutral-800 px-4 py-2"
                onClick={() => handleSelect(user.login)}
              >
                <img
                  src={user.avatarUrl}
                  alt={user.login}
                  className="w-8 h-8 mr-2"
                />
                <p>{user.login}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
