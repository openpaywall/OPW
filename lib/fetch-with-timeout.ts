export async function fetchWithTimeout(url: string, timeout: number = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  } finally {
    clearTimeout(id);
  }
}
