"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const ProxyPage = () => {
    const [url, setUrl] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const router = useRouter();
    const searchParams = useSearchParams();

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
            // add more sources as needed
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

        const urlToFetch = searchParams.get('url');
        if (urlToFetch) {
            const encodedUrl = encodeURIComponent(urlToFetch);
            fetchContent(encodedUrl);
        }
    }, [searchParams]);

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
