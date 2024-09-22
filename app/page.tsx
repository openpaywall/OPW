"use client"; // Make sure the page is entirely client-side

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed to next/navigation

const FetchContentPage = () => {
  const router = useRouter(); // Use the router only client-side
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const url = new URLSearchParams(window.location.search).get('url');
    if (url) {
      fetchContent(url);
    }
  }, []);

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







