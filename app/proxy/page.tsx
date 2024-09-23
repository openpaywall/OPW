"use client";

import { useState, useEffect } from "react";

export default function ProxyPage() {
  const [content, setContent] = useState<string | null>(null);
  const [url, setUrl] = useState<string>("");

  const fetchContent = async (url: string) => {
    try {
      const response = await fetch(`/api/fetch-content?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        setContent("Error fetching content");
      }
    } catch (error) {
      setContent("An error occurred");
    }
  };

  useEffect(() => {
    if (url) {
      fetchContent(url);
    }
  }, [url]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchContent(url);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter URL"
        />
        <button type="submit">Fetch Content</button>
      </form>
      {content ? (
        <div>
          <h2>Fetched Content</h2>
          <p>{content}</p>
        </div>
      ) : (
        <p>No content fetched yet</p>
      )}
    </div>
  );
}
