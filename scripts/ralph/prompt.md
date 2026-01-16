# Ralph Agent Instructions

## Your Task

1. Read `scripts/ralph/prd.json`
2. Read `scripts/ralph/progress.txt`
   (check Codebase Patterns first)
3. Read `.cursorrules` if it exists (project root)
4. Read `task_instructions.md` for project requirements (if exists)
5. Check `llm_stream_dump.jsonl` for sample data format (if exists)
6. Check you're on the correct branch
7. Pick highest priority story 
   where `passes: false`
8. Implement that ONE story
9. Run typecheck and tests
10. Update AGENTS.md files with learnings (in relevant directories)
11. Update `.cursorrules` if you discovered project-wide patterns
12. Commit: `feat: [ID] - [Title]`
13. Update prd.json: `passes: true`
14. Append learnings to progress.txt

## Project Context

This is an AI Explore page project that:
- Loads .jsonl files with LLM streaming events
- Emulates SSE streaming with delays
- Extracts and renders Vega-Lite charts from streaming text
- Uses React + TypeScript + Vega-Lite

Reference files:
- `task_instructions.md` - Full requirements
- `llm_stream_dump.jsonl` - Sample data format

## Progress Format

APPEND to progress.txt:

## [Date] - [Story ID]
- What was implemented
- Files changed
- **Learnings:**
  - Patterns discovered
  - Gotchas encountered
---

## Codebase Patterns

Add reusable patterns to the TOP 
of progress.txt:

## Codebase Patterns
- Migrations: Use IF NOT EXISTS
- React: useRef<Timeout | null>(null)

Also update `.cursorrules` at project root for project-wide patterns.

## Stop Condition

If ALL stories pass, reply:
<promise>COMPLETE</promise>

Otherwise end normally and indicate which story was completed.

