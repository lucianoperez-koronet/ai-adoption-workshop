import type { ICatalogLLMProvider } from './types.js';
import { OpenAIProvider } from './openai.provider.js';
import { GeminiProvider } from './gemini.provider.js';

export type { CatalogQuery, ICatalogLLMProvider } from './types.js';

export function getCatalogLLMProvider(): ICatalogLLMProvider {
  const provider = process.env.LLM_PROVIDER;
  if (!provider) {
    throw new Error(
      'LLM_PROVIDER is required. Set to "openai" or "gemini" in .env'
    );
  }

  if (provider === 'openai') {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required when LLM_PROVIDER=openai');
    }
    return new OpenAIProvider(apiKey);
  }

  if (provider === 'gemini') {
    const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY or GOOGLE_AI_API_KEY is required when LLM_PROVIDER=gemini'
      );
    }
    return new GeminiProvider(apiKey);
  }

  throw new Error(
    `Invalid LLM_PROVIDER "${provider}". Use "openai" or "gemini".`
  );
}
