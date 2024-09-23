import { fetchWithTimeout } from '../../lib/fetch-with-timeout';

export async function getSummary(url: string): Promise<string> {
  try {
    const text = await fetchWithTimeout(url); // `fetchWithTimeout` already returns text content

    if (!text) {
      return "No text found";
    }

    return text;
  } catch (error) {
    console.error("Error fetching the summary:", error);
    return "Failed to fetch content.";
  }
}
