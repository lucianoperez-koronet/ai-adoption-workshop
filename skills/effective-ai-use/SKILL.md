---
name: effective-ai-use
description: Use AI effectively during the 3-hour build – prompts, rules, MCP, iteration
---

# Effective AI use (build session)

Use this skill during the 3-hour build to align with the **“Effective use of AI”** evaluation criterion.

## Overview

Effective use means: AI is used in a **structured, deliberate** way (Cursor rules, MCP, Skills, clear prompts), not as a one-off chat. The playbook and this repo’s rules are the baseline.

## When to use

- Starting the build (pick one goal, one stack).
- Implementing a feature (decide what to ask the AI and what to do yourself).
- Stuck or iterating (refine prompts, try MCP tools, refer to rules/Skills).
- Before demo prep (check that you can explain how you used AI).

## Checklist during the build

1. **One clear goal** – Agree as a team on one deliverable (practical value).
2. **Use the rules** – Keep `.cursor/rules/` in mind; they steer the AI (workshop context, MCP).
3. **Use MCP when it fits** – e.g. create branch/PR via GitHub MCP, open a URL or run a flow via browser MCP, pull a component via shadcn MCP.
4. **Prompt clearly** – Include context (file, goal, constraints); ask for one thing at a time when possible.
5. **Review AI output** – Don’t paste and ship; understand and adapt the code or suggestion.
6. **Document briefly** – In README or DEMO_CHECKLIST, note what AI did (e.g. “Scaffolded UI with Cursor + shadcn MCP”) for clarity and replicability.

## Replicability

Commit the repo with rules and skills; add a short “How we used AI” section so another team can replicate your approach.
