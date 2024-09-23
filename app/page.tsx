import { useState } from 'react';
import { useRouter } from 'next/router';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    router.push(`/fetch?url=${encodeURIComponent(url)}`);
  };

  return (
    <div>
      <h1>Enter a URL to Fetch Content</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL here"
        />
        <button type="submit">Fetch</button>
      </form>
    </div>
  );
}

