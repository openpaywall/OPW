"use client";
import { useState } from "react";

const Page = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchContent = async () => {
    if (!url) {
      setError("Please enter a valid URL.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Encode the URL and use archival sources
      const encodedUrl = encodeURIComponent(url);
      const sources = [
        `https://archive.ph/?run=1&url=${encodedUrl}`,
        `https://web.archive.org/web/*/${encodedUrl}`,
        `https://webcache.googleusercontent.com/search?q=cache:${encodedUrl}`,
        `https://www.bing.com/cache.aspx?q=${encodedUrl}`,
        `https://archive.org/web/*/${encodedUrl}`
      ];

      // Iterate through sources until content is fetched
      let fetchedContent = "";
      for (let source of sources) {
        const response = await fetch(source);
        if (response.ok) {
          fetchedContent = await response.text();
          break;
        }
      }

      if (!fetchedContent) {
        setError("Failed to fetch content from archival sources.");
      } else {
        setContent(fetchedContent);
      }
    } catch (err) {
      setError("An error occurred while fetching the content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Open Paywall</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      />
      <button onClick={fetchContent} style={{ padding: "10px" }}>
        Fetch Content
      </button>

      {loading && <p>Loading content...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render fetched content */}
      {content && (
        <div>
          <h2>Fetched Content</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  );
};

export default Page;
