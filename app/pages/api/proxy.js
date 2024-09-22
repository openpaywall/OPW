// pages/api/proxy.js

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  const sanitizedUrl = encodeURIComponent(url);

  // List of archive sources to fetch content
  const sources = [
    `https://archive.ph/?run=1&url=${sanitizedUrl}`,
    `https://web.archive.org/web/*/${url}`,
    `https://webcache.googleusercontent.com/search?q=cache:${url}`,
    `https://www.bing.com/cache.aspx?q=${sanitizedUrl}`,
    `https://archive.org/web/*/${url}`,
    `https://screenshotmachine.com/?url=${sanitizedUrl}`,
    `https://perma.cc/${sanitizedUrl}`,
    `https://archive.is/?run=1&url=${sanitizedUrl}`,
    `https://www.pagepeeker.com/peeker.php?url=${sanitizedUrl}`
  ];

  let success = false;

  for (let i = 0; i < sources.length; i++) {
    try {
      const response = await fetch(sources[i]);
      if (response.ok) {
        const content = await response.text();
        return res.status(200).send(content); // Send the content from the first successful source
      }
    } catch (error) {
      console.log(`Failed to fetch from source ${i + 1}:`, error.message);
    }
  }

  if (!success) {
    return res.status(500).json({ error: 'Failed to fetch content from all sources' });
  }
}
