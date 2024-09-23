import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const FetchPage = () => {
  const router = useRouter();
  const { url } = router.query;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (url) {
      const fetchContent = async () => {
        try {
          const response = await fetch(`/api/fetch?url=${encodeURIComponent(url)}`);
          const data = await response.json();
          setContent(data);
        } catch (error) {
          console.error('Error fetching content:', error);
        }
      };

      fetchContent();
    }
  }, [url]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </div>
  );
};

export default FetchPage;


