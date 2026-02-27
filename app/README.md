# Flower Catalog Search – Natural Language

Buscador de catálogo de flores con input de lenguaje natural. Un LLM (OpenAI o Gemini) traduce la query a filtros estructurados y se aplican sobre 64 productos de muestra.

## Arquitectura

- **Frontend** (React + Vite + Tailwind): puerto 5175
- **BFF** (Hono + Node): puerto 3001

## Cómo ejecutar

1. **Configurar BFF** – Copia `.env.example` a `.env` en `bff/`:

   ```bash
   cd bff && cp .env.example .env
   ```

   Edita `.env` y configura:
   - `LLM_PROVIDER=openai` o `gemini`
   - `OPENAI_API_KEY=sk-...` (si usas OpenAI)
   - `GEMINI_API_KEY=...` (si usas Gemini)

2. **Iniciar BFF y frontend**:

   ```bash
   cd app
   npm run dev:bff    # Terminal 1
   npm run dev:frontend  # Terminal 2
   ```

   O ambos: `npm run dev` (BFF en background + frontend).

3. Abrir **http://localhost:5175**

## Ejemplos de búsqueda

- "alstroemeria rojas"
- "flores rojas de Colombia"
- "purple alstroemeria"
- "white flowers 70 cm"

## Build

```bash
cd app
npm run build
```
