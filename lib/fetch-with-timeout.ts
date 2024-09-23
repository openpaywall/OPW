export async function fetchWithTimeout(url: string, timeout: number = 10000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, { signal });
    clearTimeout(fetchTimeout);
    return response.text(); // returning the body text
  } catch (error) {
    clearTimeout(fetchTimeout);
    throw new Error("Fetch timed out or failed");
  }
}
