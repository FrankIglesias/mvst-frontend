import { useState } from 'react';
import UserSearch from './components/UserSearch';
import RepositoryList from './components/RepositoryList';

import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState<string>('FrankIglesias');

  return (
    <div className="max-w-[500px] w-full">
      <h1 className="mb-4">Repository Search</h1>
      <UserSearch onChange={setSelectedUser} />
      <RepositoryList user={selectedUser} />
    </div>
  );
}

export default App;
