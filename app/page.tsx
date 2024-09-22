// app/page.tsx or pages/index.js
"use client";  // Ensure this component is rendered on the client

import { useState } from "react";
import { useRouter } from "next/router";

const HomePage = () => {
    const [url, setUrl] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url) {
            const encodedUrl = encodeURIComponent(url);
            router.push(`/proxy?url=${encodedUrl}`);
        }
    };

    return (
        <div>
            <h1>Enter URL to Fetch Content</h1>
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
