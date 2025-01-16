interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {},
): Promise<T> {
  const { maxAttempts = 2, delayMs = 1000 } = options;
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      attempts++;
      if (attempts === maxAttempts) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // TypeScript needs this even though it's unreachable
  throw new Error('Unreachable code');
}
