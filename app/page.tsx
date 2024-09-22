"use client"; // This marks the component as a client-side component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

const FetchContentPage = () => {
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

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
        <Suspense fallback={<div>Loading...</div>}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ padding: '20px', border: '1px solid #ccc' }}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default FetchContentPage;





