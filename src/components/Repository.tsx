interface RepositoryProps {
  name: string;
  description?: string | null;
  url: string;
}

/**
 * Component for showing details of a repository
 *
 * @component
 * @example
 * const name = 'react';
 * const description = 'A declarative, efficient, and flexible JavaScript library for building user interfaces.';
 * const url = 'https://github.com/react';
 * return (
 *  <Repository name={name} description={description} url={url} />
 * )
 * @param {string} name - Name of the repository
 * @param {string} description - Description of the repository
 * @param {string} url - URL of the repository
 * @returns {JSX.Element} - Rendered Repository component
 */
function Repository({ name, description, url }: RepositoryProps) {
  return (
    <div className="border-solid border-white border-2 mb-2 rounded p-4">
      <a href={url}>
        <h4>{name}</h4>
      </a>
      <p>{description}</p>
    </div>
  );
}

export default Repository;
