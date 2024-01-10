import { useEffect, useState } from 'react';
import { useUsers } from '../api/github';

function UserSearch({ onChange }: { onChange: (user: string) => void }) {
  const { search, data: users } = useUsers();
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelect = (user: string) => {
    onChange(user);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (users.length) {
      setShowDropdown(true);
    }
  }, [users]);

  return (
    <div className="relative">
      <input type="text" onChange={(e) => search(e.target.value)} />
      {showDropdown && (
        <div className="absolute top-10 left-0 bg-neutral-400 w-full border-solid border-white border-2 rounded py-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center cursor-pointer hover:bg-neutral-300 px-4 py-2"
              onClick={() => handleSelect(user.login)}
            >
              <img
                src={user.avatarUrl}
                alt={user.login}
                className="w-8 h-8 mr-2"
              />
              <p>{user.login}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserSearch;
