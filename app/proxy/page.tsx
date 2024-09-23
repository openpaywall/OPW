"use client"; // Ensures this is a client-side component

import { useEffect, useState } from 'react';
import { fetchWithTimeout } from '../../lib/fetch-with-timeout';
import { useSearchParams } from 'next/navigation';

export default function ProxyPage() {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (url) {
      fetchWithTimeout(url)
        .then((data) => setContent(data))
        .catch((err) => setError("Failed to fetch the content. Please try again later."));
    }
  }, [url]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!content) {
    return <div>Loading content...</div>;
  }

  return (
    <div>
      <h1>Fetched Content</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

