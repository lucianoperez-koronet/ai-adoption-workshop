# AI Playbooks by Role

> Practical guide for using AI coding assistants (GitHub Copilot / Cursor) across different engineering roles. Each playbook maps common tasks to the **Plan → Agent** workflow with ready-to-use prompt templates.

**Source:** [Confluence – AI Playbooks by Role](https://vertical.atlassian.net/wiki/spaces/DDI/pages/5852954626/AI+Playbooks+by+Role)  
**In-repo copy** for hackathon context. Refresh from Confluence if the live page changes.

---

## How to Read This Document

Every scenario follows the same structure:

| Field | Description |
| --- | --- |
| **Scenario** | What you're trying to accomplish |
| **Mode** | Which AI mode to use (see Quick Reference below) |
| **Prompt Template** | Copy-paste prompt — replace `[placeholders]` with your specifics |
| **Pro Tip** | Gotchas and best practices from the team's experience |

---

## Quick Reference: The Plan → Agent Workflow

```
 PROMPT  →   PLAN   →  AGENT   →  VERIFY
 Describe     AI maps   AI edits   You test
 the task     the steps the code   & review
```

| Step | Copilot (VS Code) | Cursor | When to Use |
| --- | --- | --- | --- |
| **Plan** | Chat → select "Plan" | Plan mode / Cmd+L | Multi-file changes, new features, refactors |
| **Agent** | Chat → select "Agent" | Agent mode / Cmd+I | Execute the plan: edit files, run commands |
| **Inline Chat** | Ctrl+I on selection | Ctrl+K on selection | Single-file fixes, quick explanations, simplify |
| **Skills / Rules** | `.github/copilot-instructions.md` | `.cursor/rules/*.mdc` | Encode project conventions so AI remembers them automatically |

**When to use Plan → Agent vs. Inline Chat:**

* **Plan → Agent**: Any change touching 2+ files, or requiring research across the codebase
* **Inline Chat**: Single-block fixes, syntax review, quick explanations

---

## 1 · Backend Developer Playbook

_For developers working primarily on Java services, Spring MVC/Boot, SQL, Spock/Groovy tests, and inter-service communication (gRPC, Kafka)._

### 1.1 Generate Unit Tests with Spock/Groovy

**Mode:** Plan → Agent

**Prompt Template:**

```
Generate Spock/Groovy unit tests for the method `[ClassName.methodName]`.

Requirements:
- Extend `Specification`
- Use `given:` / `when:` / `then:` block structure
- Use `@Unroll` with `where:` tables for parameterized cases
- Mock dependencies with `Mock()` and verify interactions with `N * mock.method() >> value`
- Cover: happy path, edge cases (null inputs, empty collections), and error/exception flows
- Follow the existing test naming convention: `"methodName: description of scenario"`
```

**Pro Tip:** If your project has a Skill/Rule for test conventions, the AI will automatically follow them without you repeating these instructions every time.

### 1.2 Implement a Feature Across Controller → Service → DAO

**Mode:** Plan → Agent

**Prompt Template:**

```
Add a new endpoint: [HTTP_METHOD] /api/v2/[resource-path]

Business logic: [Describe what it should do]

Follow the project's layered pattern:
1. Controller: @RestController with @PostMapping/@GetMapping, receive params from request/session
2. Service: Interface + Impl with @Service, business logic here
3. DAO: Interface + Impl, Hibernate-based data access

Return a standard JSON response. Include input validation and proper error handling.
```

**Pro Tip:** Start in **Plan mode** to let the AI map out the classes and interfaces it will create. Review the plan before switching to Agent to execute.

### 1.3 Review and Fix SQL Queries

**Mode:** Inline Chat (select the query → trigger chat)

**Prompt Template:**

```
Review this SQL query for:
- Correctness: joins, GROUP BY, null handling
- Performance: missing indexes, N+1 patterns, unnecessary subqueries
- Security: SQL injection risks if parameters are concatenated
Suggest a corrected version if issues are found.
```

**Pro Tip:** For complex queries, paste the relevant table DDL or entity mappings as additional context.

### 1.4 Fix and Simplify Java Code

**Mode:** Inline Chat (select the code block → trigger chat)

**Prompt Template (Fix):**

```
Fix this code. Check for: null pointer risks, incorrect variable assignments,
missing error handling, resource leaks, and thread-safety issues.
```

**Prompt Template (Simplify):**

```
Simplify this method, but keep it readable for the team:
- Preserve meaningful variable names (don't compress to single letters)
- Add a brief comment if you compress complex logic into a stream/lambda
- Don't merge multiple responsibilities into one line
```

**Pro Tip:** Over-simplified code is a recurring issue — the AI tends to compress into streams and ternaries. If the result is harder to understand, ask to "simplify less aggressively."

---

## 2 · Fullstack Developer Playbook

_For developers working across Java backend and React frontend, implementing features end-to-end from design specs or DLDs._

### 2.1 Implement UI from a Design Reference

**Mode:** Agent (attach screenshot or describe the design)

**Prompt Template:**

```
Implement this UI design as a React component.

Use the project's existing patterns:
- Place it in `features/[featureName]/components/`
- Use [AntDesign / Tailwind / project UI library] for styling
- Create a custom hook in `hooks/` if the component needs API calls
- API calls go in `requests.js` within the feature folder

[Attach screenshot or describe the layout in detail]
```

**Pro Tip:** Give the visual reference AND specify which UI library to use; otherwise the agent may generate raw HTML/CSS.

### 2.2 Full-Stack Feature from a DLD / Spec

**Mode:** Plan → Agent

**Prompt Template:**

```
Implement the following feature based on this spec:

[Paste DLD summary or attach the document]

Implementation order:
1. Backend: New endpoint(s) with Controller → Service → DAO
2. Frontend: Page component + feature folder with components, hooks, and API requests
3. Tests: Spock/Groovy tests for the backend service layer

Ask me before making assumptions about business rules not covered in the spec.
```

**Pro Tip:** Use Plan mode to validate the AI's interpretation of the DLD before it writes code. For ambiguous DLDs, ask first: "list what's unclear or underspecified in this DLD."

### 2.3 Automated Commit Messages and PR Descriptions

**Mode:** IDE Instructions (one-time setup)

**Setup (Cursor):** Add to `.cursor/rules/commits.mdc` conventional commits format (feat|fix|refactor|test|docs(scope): description, first line under 72 chars, body with bullet points for multi-file changes).

**Pro Tip:** Use the commit message generation in your IDE's source control — it will follow the project convention.

### 2.4 Validate a DLD for Technical Feasibility

**Mode:** Chat

**Prompt Template:**

```
Review this DLD for technical feasibility:

[Paste DLD content]

Check for:
- Missing error handling or edge cases
- Unclear data flows between frontend and backend
- Performance concerns (large payloads, missing pagination, N+1 queries)
- Missing API contracts (request/response schemas)
- Gaps between what's described and what the current codebase supports

Structure your response as: ✅ Covered | ⚠️ Gaps Found | 🔴 Blockers
```

---

## 3 · Tech Lead / Architect Playbook

_For senior engineers focused on architecture decisions, infrastructure, observability, cross-stack research, mentoring, and documentation._

### 3.1 Validate Architecture Decisions

**Mode:** Chat (multi-turn or multi-model)

**Prompt Template:**

```
Evaluate this design decision:

[Describe the proposed approach]

Context: [Project constraints, scale, team size]

Analyze against:
- SOLID principles
- Existing project architecture patterns (hexagonal / layered)
- Operational concerns (observability, failure modes, rollback)

Structure your response as:
1. Rating (1-10)
2. Pros
3. Cons
4. Recommended improvements
```

**Pro Tip:** Run the same prompt through 2–3 different models and compare; disagreements often highlight debatable parts. Use separate chats to avoid context bias.

### 3.2 Set Up Local Infrastructure

**Mode:** Agent

**Prompt Template:**

```
Create a Docker Compose setup for local development with:
- [List services: e.g., Prometheus, Grafana, OpenTelemetry Collector, Kafka, OpenSearch]
- Pre-configured dashboards/configs where applicable
- Health checks for all services
- A README.md with: prerequisites, start/stop commands, and how to access each UI

Put everything under `.local-dev/[setup-name]/`.
```

**Pro Tip:** Test the generated `docker-compose.yml` before sharing with the team.

### 3.3 Diagnose Production Issues via Observability Tools

**Mode:** Chat + MCP integrations (Sentry, logs)

**Prompt Template:**

```
Investigate errors in [service-name] over the last 24 hours.

Steps:
1. Query Sentry for the top issues by frequency
2. Compare with the 30-day baseline — are these new or recurring?
3. For the top 3 issues, identify: stack trace → root cause, affected code path, suggested fix

Format as a triage table: Issue | Severity | Root Cause | Action Item
```

**Pro Tip:** With MCP configured, the agent can pull real production data instead of guessing.

### 3.4 Generate Documentation and Mentoring Materials

**Mode:** Chat → Agent

**Prompt Template (DLD):** Create a Detailed Design Document with overview, Mermaid data flow, API contracts, DB changes, rollback plan, testing strategy, open questions.

**Prompt Template (Knowledge sharing):** Create a 30-minute session outline, 3 key concepts with code examples, discussion questions, and a one-page cheat sheet.

**Pro Tip:** Ask the AI to "analyze recent PRs from [developer] and suggest areas for growth" for mentoring.

### 3.5 Automate Toil: Mocks, Test Data, and Boilerplate

**Mode:** Agent

**Prompt Template:**

```
Generate test data for [feature/scenario]:
- [N] realistic records for [table/entity] as [format: SQL INSERT / CSV / JSON]
- Include edge cases: null optional fields, max-length strings, boundary dates
- Data should be internally consistent (foreign keys reference valid records)
```

**Pro Tip:** Let the agent handle mocks and seed data; it often saves hours.

---

## Tips & Anti-Patterns

### ✅ Do

| Tip | Why |
| --- | --- |
| **Start in Plan mode for multi-file changes** | Catches misunderstandings before code is written |
| **Use Skills/Rules files to encode project conventions** | Eliminates repetitive prompting |
| **Cross-validate critical plans across different models** | Different models catch different blind spots |
| **Run `build` and `test` after Agent changes** | AI doesn't always verify its own output |
| **Keep the AI's context focused** | One task per chat; start fresh for unrelated tasks |

### 🚫 Don't

| Anti-Pattern | What Happens |
| --- | --- |
| **Accept "simplified" code without reviewing** | AI compresses into unreadable streams/ternaries |
| **Let the agent run tests it can't interpret** | It may mark a failing test as "done" |
| **Skip the Plan step for large features** | Agent writes code before understanding → rework |
| **Assume the AI remembers project rules across sessions** | Encode rules in Skills/Rules instead of re-explaining |
| **Use AI output without testing in the actual environment** | Test side-effects (changing A shouldn't break Z) |

---

## Appendix: Setting Up Skills / Rules

### Cursor

Create `.cursor/rules/[rule-name].mdc` files (one per concern) with `description`, `globs`, and the convention text. With rules in place, you can use shorter prompts — e.g. "generate tests for this method" instead of repeating full Spock instructions.

### Skills (Kometsales)

Skills are markdown files that encode project-specific knowledge so the AI follows it automatically. Run `./skills/setup.sh` from the [Kometsales skills repo](https://github.com/koronet-network/kometsales/tree/master/skills) to symlink skills for Copilot, Cursor, Claude Code, Codex, Gemini. Restart the AI after setup.

**How Skills connect to the playbooks:** Every prompt template becomes shorter when skills are active — you describe **what** you want, and the AI already knows **how** your project does it.

---

*Full Confluence version (including GitHub Copilot setup and full Skills section): [AI Playbooks by Role](https://vertical.atlassian.net/wiki/spaces/DDI/pages/5852954626/AI+Playbooks+by+Role).*
