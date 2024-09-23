"use client"; // Ensures this is a client-side component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Replace next/router with next/navigation

export default function HomePage() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleFetch = (event: React.FormEvent) => {
    event.preventDefault();
    if (url) {
      router.push(`/proxy?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div>
      <h1>Welcome to OpenPaywall</h1>
      <form onSubmit={handleFetch}>
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Fetch Content</button>
      </form>
    </div>
  );
}


