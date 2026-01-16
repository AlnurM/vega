#!/bin/bash
set -e

MAX_ITERATIONS=${1:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting Ralph workflow"
echo ""
echo "Open Cursor and paste the following prompt:"
echo ""
echo "═══════════════════════════════════════════════════════════"
cat "$SCRIPT_DIR/prompt.md"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "After each iteration, check if all stories pass:"
echo "  cat $SCRIPT_DIR/prd.json | jq '.userStories[] | {id, passes}'"
echo ""
echo "When all pass, the agent should reply: <promise>COMPLETE</promise>"
echo ""
echo "To monitor progress:"
echo "  # Story status"
echo "  cat $SCRIPT_DIR/prd.json | jq '.userStories[] | {id, passes}'"
echo ""
echo "  # Learnings"
echo "  cat $SCRIPT_DIR/progress.txt"
echo ""
echo "  # Commits"
echo "  git log --oneline -10"

