// app/page.tsx
"use client"; // This tells Next.js that this is a client component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Updated to use next/navigation

const FetchContentPage = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams(); // Get the URL parameter for the input URL
  const url = searchParams.get('url'); // Assuming you pass the URL via query param (e.g., ?url=https://...)

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



