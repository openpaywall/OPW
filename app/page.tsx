"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/proxy?url=${encodeURIComponent(url)}`);
  };

  return (
    <div>
      <h1>Welcome to OpenPaywall</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={handleInputChange}
          placeholder="Enter URL to fetch content"
        />
        <button type="submit">Fetch Content</button>
      </form>
    </div>
  );
}
