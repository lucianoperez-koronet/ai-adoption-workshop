# Skills: how we use AI in this repo

This document describes how AI is used in the **Koronet AI Adoption Workshop** repo: Cursor rules, MCP, and Skills. It supports **effective use of AI**, **clarity**, and **replicability** in the evaluation.

---

## 1. Cursor rules (`.cursor/rules/`)

Cursor reads rules from `.cursor/rules/*.mdc` and applies them when working in this repo. They tell the AI:

- **Workshop context** – 3-hour build, 5-min demo, evaluation criteria.
- **MCP usage** – Prefer MCP tools (e.g. GitHub, browser, Figma, shadcn) when they fit the task.
- **Quality** – Run `npm run build` (or equivalent) after changes when there is an app.

Use the rules as the “contract” for how the AI should behave in this project.

---

## 2. MCP (Model Context Protocol)

MCP servers extend Cursor with tools. Available in this environment (when configured), for example:

- **GitHub** – Issues, PRs, repos, file contents (use MCP or git via terminal; avoid `gh` CLI per user preference).
- **Browser / Chrome DevTools** – Navigate, snapshot, click, fill (for live demos or E2E).
- **Figma** – Get design data, export assets.
- **shadcn-ui** – Components and blocks for quick UI.
- **Docker / Postman** – Containers, API collections, mocks.

**Skill:** Prefer MCP tools over “simulate in text” when the tool can do the real action (e.g. create a branch, open a URL, fetch a component).

---

## 3. Skills (`skills/`)

Skills are reusable instructions the team (and AI) can follow for specific tasks. In this repo:

| Skill | Purpose |
|-------|--------|
| **effective-ai-use** | Use AI effectively during the 3-hour build (prompts, rules, MCP, iteration). |
| **demo-prep** | Prepare the 5-minute demo (script, clarity, replicability). |

Each skill lives in `skills/<name>/SKILL.md` with a short description and step-by-step or checklist format. Reference them in chat or in Cursor when doing that task.

---

## 4. Workflow for the build session

1. **Kickoff** – Agree on one concrete goal (practical value + a bit of innovation).
2. **Scaffold** – Use `app/` (or replace it) with your stack; keep it simple.
3. **Code with AI** – Use Cursor + rules + MCP; apply Skills when relevant.
4. **Document as you go** – Brief notes in README or DEMO_CHECKLIST on what AI did and what you decided.
5. **Demo prep** – Use the **demo-prep** skill and [DEMO_CHECKLIST.md](DEMO_CHECKLIST.md) before the 5-minute slot.

---

## 5. Replicability

To score well on **replicability**:

- Keep **.cursor/rules/** and **skills/** in the repo and committed.
- In README or DEMO_CHECKLIST, add a short “How we used AI” section (tools, prompts, decisions).
- If you add new Skills, add them under `skills/<name>/SKILL.md` and mention them in this SKILLS.md.

That way another team can open the repo and understand how to reuse your setup.
