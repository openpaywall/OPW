import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProxyPage = () => {
    const router = useRouter();
    const { url } = router.query; // Get URL from query params
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const archivalSources = [
        (encodedUrl) => `https://archive.ph/?run=1&url=${encodedUrl}`,
        (encodedUrl) => `https://web.archive.org/web/*/${encodedUrl}`,
        (encodedUrl) => `https://webcache.googleusercontent.com/search?q=cache:${encodedUrl}`,
        // Add more archival sources here if needed
    ];

    useEffect(() => {
        const fetchContent = async () => {
            if (!url) return;
            const encodedUrl = encodeURIComponent(url);
            let success = false;

            for (const getSource of archivalSources) {
                try {
                    const response = await fetch(getSource(encodedUrl)); // Try fetching from each source
                    if (response.ok) {
                        const html = await response.text();
                        setContent(html);
                        success = true;
                        break;
                    }
                } catch (err) {
                    // Continue to the next source if this one fails
                }
            }

            if (!success) {
                setError("Failed to fetch content from all sources.");
            }
            setLoading(false);
        };

        fetchContent();
    }, [url]);

    return (
        <div>
            <h1>Fetched Content</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </div>
    );
};

export default ProxyPage;
