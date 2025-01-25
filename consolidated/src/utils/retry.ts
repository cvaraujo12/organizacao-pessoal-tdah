import { PostgrestResponse, PostgrestSingleResponse } from '@supabase/supabase-js';

interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  backoffFactor: number;
}

const defaultConfig: RetryConfig = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffFactor: 2,
};

export async function retryOperation<T>(
  operation: () => Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>>,
  config: Partial<RetryConfig> = {}
): Promise<PostgrestResponse<T> | PostgrestSingleResponse<T>> {
  const finalConfig = { ...defaultConfig, ...config };
  let lastError: Error | null = null;
  let attempt = 0;

  while (attempt < finalConfig.maxAttempts) {
    try {
      const result = await operation();
      if (result.error) throw result.error;
      return result;
    } catch (error) {
      lastError = error as Error;
      attempt++;
      
      if (attempt < finalConfig.maxAttempts) {
        const delay = finalConfig.delayMs * Math.pow(finalConfig.backoffFactor, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Operation failed after maximum retry attempts');
} 