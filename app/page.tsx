"use client"; // Add this directive to mark the component as client-side

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const FetchContentPage = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (url) {
      fetchContent(url);
    }
  }, [url]);

  const fetchContent = async (url) => {
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


