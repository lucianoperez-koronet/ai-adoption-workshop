# Koronet AI Adoption Workshop – From Practice to Impact

Repo for the **Koronet AI Adoption Workshop**: structured AI usage, Cursor + MCP + rules + Skills, ready for the 3-hour build session and 5-minute demo.

---

## Workshop at a glance

| Item | Details |
|------|--------|
| **Format** | Team formation (3–4 people) → 3-hour AI-powered build → 5-min demo per team |
| **Objective** | Move from ad-hoc AI usage to structured, high-impact integration in the SDLC |
| **Evaluation** | Effective use of AI · Practical value · Innovation · Clarity of explanation · Replicability |

**Prize:** TBD

---

## Demo app: NL Flower Catalog Search

This repo includes a **reference app** built with the workshop stack:

- **Natural-language flower catalog search**: user types in Spanish or English (e.g. “alstroemeria rojas”, “white flowers from Colombia”); an LLM (OpenAI or Gemini) interprets the query into structured filters; a BFF filters 64 sample products and returns results.
- **Frontend**: React 19 + Vite + Tailwind, with `NaturalSearchBar`, `ProductGrid`, `ProductCard`, `FilterChips`.
- **BFF**: Hono + configurable LLM provider (OpenAI / Gemini), `POST /api/search`, shared system prompt and catalog data.

See **[app/README.md](app/README.md)** for run instructions and **[docs/implementation_plan.md](docs/implementation_plan.md)** for architecture and implementation details.

---

## Before the workshop

1. **Review the Komet AI Playbook** (required):
   - [AI Playbooks by Role](https://vertical.atlassian.net/wiki/spaces/DDI/pages/5852954626/AI+Playbooks+by+Role) *(Confluence – log in with your Atlassian account.)*
   - Or use the in-repo copy: [docs/AI_PLAYBOOK_BY_ROLE.md](docs/AI_PLAYBOOK_BY_ROLE.md)

2. **Skim this repo:**
   - [docs/AI_PLAYBOOK_BY_ROLE.md](docs/AI_PLAYBOOK_BY_ROLE.md) – full playbook (in-repo context for the hackathon)
   - [docs/AI_PLAYBOOK_SUMMARY.md](docs/AI_PLAYBOOK_SUMMARY.md) – short summary aligned with evaluation criteria
   - [docs/SKILLS.md](docs/SKILLS.md) – how we use AI in this repo (Skills, MCP, Cursor)
   - [docs/DEMO_CHECKLIST.md](docs/DEMO_CHECKLIST.md) – 5-minute demo and scoring checklist

3. **Come ready to build.**  
   Decide as a team what to build; this repo gives you rules, skills, and a working demo app in `app/` to learn from or extend.

---

## Repo layout

```
ai-adoption-workshop/
├── README.md                 # This file
├── docs/
│   ├── AI_PLAYBOOK_BY_ROLE.md
│   ├── AI_PLAYBOOK_SUMMARY.md
│   ├── SKILLS.md
│   ├── DEMO_CHECKLIST.md
│   └── implementation_plan.md  # NL Flower Catalog – architecture & plan
├── .cursor/
│   └── rules/                # Cursor AI rules (workshop + MCP)
├── skills/
│   ├── effective-ai-use/
│   └── demo-prep/
└── app/                      # Demo: NL Flower Catalog Search
    ├── README.md             # Run instructions, env, examples
    ├── package.json          # npm workspaces (frontend + bff)
    ├── frontend/             # React 19 + Vite + Tailwind
    │   └── src/
    │       ├── components/   # NaturalSearchBar, ProductGrid, ProductCard, FilterChips
    │       ├── types/
    │       └── services/
    └── bff/                  # Hono + LLM (OpenAI | Gemini)
        ├── .env.example
        └── src/
            ├── routes/       # POST /api/search
            ├── services/llm/ # ICatalogLLMProvider, OpenAI, Gemini
            ├── prompts/      # catalog search system prompt
            ├── data/         # 64 products (JSON)
            └── utils/        # filterProducts
```

---

## Quick start (day of the workshop)

1. Clone or open this repo in **Cursor**.
2. Form your team (3–4 people).
3. **Run the demo app** (optional): `cd app`, copy `bff/.env.example` → `bff/.env`, set `LLM_PROVIDER` and API key(s), then `npm run dev`. Open http://localhost:5175.
4. Choose what to build; put it in `app/` or replace with your own project.
5. Use **Cursor + MCP + rules + Skills** as you code (see [docs/SKILLS.md](docs/SKILLS.md)).
6. Before the 5-min slot: run through [docs/DEMO_CHECKLIST.md](docs/DEMO_CHECKLIST.md).

---

## Evaluation criteria (reminder)

- **Effective use of AI** – How well you used AI (Cursor, MCP, playbook) during the build.
- **Practical value** – Does the outcome solve a real problem or improve a workflow?
- **Innovation** – Creative or novel use of AI or product idea.
- **Clarity of explanation** – Can others follow how you built it and how AI helped?
- **Replicability** – Could another team reuse your approach or repo?

This repo is set up for **effective use of AI**, **clarity**, and **replicability**; your team brings the **practical value** and **innovation**.
