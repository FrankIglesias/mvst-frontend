interface RepositoryProps {
  name: string;
  description?: string | null;
  url: string;
}

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
