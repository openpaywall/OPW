"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProxyPage = () => {
    const [url, setUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (url) {
            const encodedUrl = encodeURIComponent(url);
            router.push(`/proxy?url=${encodedUrl}`);
        }
    };

    useEffect(() => {
        const archivalSources = [
            (encodedUrl: string) => `https://archive.ph/?run=1&url=${encodedUrl}`,
            (encodedUrl: string) => `https://web.archive.org/web/*/${encodedUrl}`,
            (encodedUrl: string) => `https://webcache.googleusercontent.com/search?q=cache:${encodedUrl}`,
            (encodedUrl: string) => `https://www.bing.com/cache.aspx?q=${encodedUrl}`,
            (encodedUrl: string) => `https://archive.is/?run=1&url=${encodedUrl}`,
            (encodedUrl: string) => `https://www.pagepeeker.com/peeker.php?url=${encodedUrl}`,
            (encodedUrl: string) => `https://screenshotmachine.com/?url=${encodedUrl}`,
            (encodedUrl: string) => `http://www.webcitation.org/query?url=${encodedUrl}`,
            (encodedUrl: string) => `https://perma.cc/${encodedUrl}`
        ];

        const fetchContent = async (encodedUrl: string) => {
            try {
                for (let i = 0; i < archivalSources.length; i++) {
                    const sourceUrl = archivalSources[i](encodedUrl);
                    const response = await fetch(`/api/proxy?url=${sourceUrl}`);
                    if (response.ok) {
                        const fetchedContent = await response.text();
                        setContent(fetchedContent);
                        break;
                    }
                }
            } catch (error) {
                console.error('Error fetching content:', error);
            }
        };

        // Handle url safely
        const urlToFetch = Array.isArray(router.query.url) ? router.query.url[0] : router.query.url;
        if (urlToFetch) {
            const encodedUrl = encodeURIComponent(urlToFetch);
            fetchContent(encodedUrl);
        }
    }, [router.query.url]);

    return (
        <div>
            <h1>Proxy Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter a URL"
                />
                <button type="submit">Fetch Content</button>
            </form>
            <div>
                <h2>Fetched Content</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default ProxyPage;
