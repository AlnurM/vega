# Ralph Agent for Cursor

Automated development workflow using Cursor agents to implement user stories iteratively.

## Quick Start

1. **Edit your stories** in `prd.json`
2. **Open Cursor** in your project
3. **Paste the prompt** from `prompt.md` into Cursor chat (Cmd+L / Ctrl+L)
4. **Let the agent work** - it will complete stories one by one
5. **Monitor progress**:
   ```bash
   # Check story status
   cat scripts/ralph/prd.json | jq '.userStories[] | {id, passes}'
   
   # View learnings
   cat scripts/ralph/progress.txt
   ```

## Files

- `prompt.md` - Instructions for Cursor agent (paste this into chat)
- `prd.json` - Your user stories and task list
- `progress.txt` - Session memory and learnings
- `ralph.sh` - Helper script to display prompt
- `../.cursorrules` - Project-wide patterns (in project root)

## Usage

### Option 1: Manual (Recommended)
1. Open Cursor
2. Open chat (Cmd+L / Ctrl+L)
3. Copy and paste contents of `prompt.md`
4. Agent completes one story
5. Repeat until all stories pass

### Option 2: Using helper script
```bash
./scripts/ralph/ralph.sh
```
This will display the prompt to paste into Cursor.

## Adding Stories

Edit `prd.json`:
```json
{
  "branchName": "ralph/feature",
  "userStories": [
    {
      "id": "US-001",
      "title": "Your story title",
      "acceptanceCriteria": [
        "Criterion 1",
        "Criterion 2",
        "typecheck passes"
      ],
      "priority": 1,
      "passes": false,
      "notes": ""
    }
  ]
}
```

- `priority`: Lower number = higher priority
- `passes`: Set to `true` when story is complete
- `acceptanceCriteria`: Must be explicit and testable

## Completion

When all stories pass, the agent will reply:
```
<promise>COMPLETE</promise>
```

