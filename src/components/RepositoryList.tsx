import { useEffect, useRef, useState } from 'react';
import Repository from './Repository';
import { useRepositories } from '../hooks/useRepositories';

/**
 * Component for displaying a list of repositories
 * 
 * @component
 * @example
 * const user = 'FrankIglesias';
 * return (
 * <RepositoryList user={user} />
 * )
 * @param {string} user - GitHub username
 * @returns {JSX.Element} - Rendered RepositoryList component
 * 
 **/
export default function RepositoryList({ user }: { user: string }) {
  const ref = useRef(null);
  const [repoName, setRepoName] = useState<string>();
  const {
    data: repositories,
    fetchMore,
    hasMore,
    loading,
    search,
  } = useRepositories(user);

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
  useEffect(() => {
    setRepoName(undefined);
  }, [user]);
  return loading ? (
    <p>Loading please wait...</p>
  ) : (
    <>
      <div>
        <div className="py-4 flex justify-between items-center">
          <span>{user} repositories</span>
          <input
            type="text"
            placeholder="Search by repo name"
            className="border border-gray-300 rounded-md px-4 py-2"
            value={repoName}
            onChange={(e) => {
              setRepoName(e.target.value);
              search(e.target.value);
            }}
          />
        </div>
        {!repositories.length ? (
          <p>No repositories found</p>
        ) : (
          <>
            {repositories.map((repository) => (
              <Repository
                key={repository.id}
                name={repository.name}
                description={repository.description}
                url={repository.url}
              />
            ))}
            {hasMore && <div ref={ref}>Loading....</div>}
          </>
        )}
      </div>
    </>
  );
}
