"use client"; // Ensure this is a client-side component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Changed to useRouter

const FetchContentPage = () => {
  const router = useRouter();
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const url = router.query.url as string; // Capture URL query from router

  useEffect(() => {
    if (url) {
      fetchContent(url);
    }
  }, [url]);

  const fetchContent = async (url: string) => {
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const htmlContent = await response.text();
        setContent(htmlContent);
      } else {
        setError('Failed to fetch content');
      }
    } catch (err) {
      setError('Error occurred while fetching content');
    }
  };

  return (
    <div>
      <header>
        <h1>Open Paywall</h1>
        <p>Fetching content from archives...</p>
      </header>

      <main>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          style={{ padding: '20px', border: '1px solid #ccc' }}
        />
      </main>
    </div>
  );
};

export default FetchContentPage;






