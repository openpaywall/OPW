// app/proxy.tsx or similar based on project structure
"use client";  // Ensure this component is rendered on the client

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProxyPage = () => {
    const [content, setContent] = useState(null);
    const router = useRouter();
    const { url } = router.query;

    useEffect(() => {
        if (url) {
            fetchContent(decodeURIComponent(url));
        }
    }, [url]);

    const fetchContent = async (fetchedUrl) => {
        try {
            const response = await fetch(`/api/proxy?url=${encodeURIComponent(fetchedUrl)}`);
            if (response.ok) {
                const data = await response.json();
                setContent(data);
            } else {
                setContent({ error: "Failed to fetch content" });
            }
        } catch (error) {
            setContent({ error: "An error occurred while fetching content" });
        }
    };

    if (!content) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Fetched Content</h1>
            {content.error ? (
                <p>{content.error}</p>
            ) : (
                <div>
                    <h2>{content.title}</h2>
                    <p>{content.body}</p>
                </div>
            )}
        </div>
    );
};

export default ProxyPage;
