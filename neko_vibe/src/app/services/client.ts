import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosError} from 'axios';
import PQueue from 'p-queue';
  
  // Rate limit configuration
const RATE_LIMITS = {
    SECOND: 3,
    MINUTE: 60
};
  
const requestTimestamps: number[] = [];
const requestQueue = new PQueue({
    intervalCap: RATE_LIMITS.SECOND,
    interval: 1000,
    carryoverConcurrencyCount: true,
});
  
const jikanClient: AxiosInstance = axios.create({
    baseURL: 'https://api.jikan.moe/v4',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
});
  
  // Fixed request interceptor with proper types
jikanClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const now = Date.now();
      const oneMinuteAgo = now - 60 * 1000;
  
      // Cleanup old timestamps
      while (requestTimestamps.length > 0 && requestTimestamps[0] < oneMinuteAgo) {
        requestTimestamps.shift();
      }
  
      // Handle minute-based rate limit
      if (requestTimestamps.length >= RATE_LIMITS.MINUTE) {
        const oldestRequestTime = requestTimestamps[0];
        const requiredDelay = oldestRequestTime + 60 * 1000 - now;
        
        await new Promise(resolve => 
          setTimeout(resolve, Math.max(0, requiredDelay))
        );
      }
  
      // Return queued request with proper typing
      return requestQueue.add(() => {
        requestTimestamps.push(Date.now());
        return config as InternalAxiosRequestConfig;
      }) as Promise<InternalAxiosRequestConfig>;
    }
);
  
  // Response interceptor remains the same
jikanClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 429) {
        const retryAfter = error.response.headers['retry-after'] || 1;
        return new Promise((resolve) => {
          setTimeout(() => resolve(jikanClient(error.config!)), retryAfter * 1000);
        });
      }
      return Promise.reject(error);
    }
);
  
export default jikanClient;