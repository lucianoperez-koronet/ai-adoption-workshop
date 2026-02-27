import { GoogleGenerativeAI } from "@google/generative-ai";
import type { CatalogQuery, ICatalogLLMProvider } from "./types.js";
import { CATALOG_SEARCH_SYSTEM_PROMPT } from "../../prompts/catalogSearch.js";
import { log } from "../../lib/logger.js";

export class GeminiProvider implements ICatalogLLMProvider {
  private model: ReturnType<GoogleGenerativeAI["getGenerativeModel"]>;
  private modelId: string;

  constructor(apiKey: string, modelId = "gemini-3-flash-preview") {
    this.modelId = modelId;
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: {
        responseMimeType: "application/json",
      },
    });
  }

  async interpretQuery(userQuery: string): Promise<CatalogQuery> {
    const startMs = Date.now();
    log.info("llm.gemini", "interpretQuery started", {
      userQuery,
      model: this.modelId,
    });

    const result = await this.model.generateContent([
      CATALOG_SEARCH_SYSTEM_PROMPT,
      userQuery,
    ]);
    const response = result.response;
    const text = response.text();
    const elapsedMs = Date.now() - startMs;

    if (!text) {
      log.warn("llm.gemini", "Empty response from Gemini", { elapsedMs });
      return {};
    }

    const stripped = text.trim().replace(/^```json\s*|\s*```$/g, "");
    const parsed = JSON.parse(stripped) as CatalogQuery;
    log.info("llm.gemini", "interpretQuery completed", {
      catalogQuery: parsed,
      rawContentLength: text.length,
      elapsedMs,
    });
    return parsed;
  }
}
