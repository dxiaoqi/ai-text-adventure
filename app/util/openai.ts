import OpenAI from 'openai';
export const runtime = 'edge';
export const openai = new OpenAI({
  apiKey: '',
  baseURL: 'https://api.nextweb.fun/openai/v1',
  maxRetries: 3
});