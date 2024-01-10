import { useEffect, useRef, useState } from 'react';
import { useRepositories } from './api/github';
import Repository from './components/Repository';
import UserSearch from './components/UserSearch';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState<string>('FrankIglesias');
  const ref = useRef(null);
  const {data: repositories, fetchMore, hasMore } =  useRepositories(selectedUser);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMore();
      }
    });
    observer.observe(ref!.current);
    return () => observer.disconnect();
  }, [ref, fetchMore]);

  return (
    <>
      <h1>Repository Search</h1>
      <UserSearch onChange={setSelectedUser} />
      {repositories.length === 0 && <p>No repositories found</p>}
      <div className="card">
        {repositories.map((repository) => (
          <Repository
            key={repository.id}
            name={repository.name}
            description={repository.description}
            url={repository.url}
          />
        ))}
      </div>
      {hasMore && <div ref={ref}>Loading....</div>}
    </>
  );
}

export default App;
