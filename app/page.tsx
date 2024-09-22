"use client";  // Needed if using app directory

import { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
    const [url, setUrl] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url) {
            const encodedUrl = encodeURIComponent(url);
            router.push(`/proxy?url=${encodedUrl}`); // Redirect to /proxy page with the URL
        }
    };

    return (
        <div>
            <h1>OpenPaywall Fetcher</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={url} 
                    onChange={(e) => setUrl(e.target.value)} 
                    placeholder="Enter URL" 
                    required 
                />
                <button type="submit">Fetch Content</button>
            </form>
        </div>
    );
};

export default HomePage;
