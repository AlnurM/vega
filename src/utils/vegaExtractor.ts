/**
 * Extracts and parses Vega spec from streaming text
 * Handles JSON that may be split across multiple chunks or wrapped in markdown code blocks
 * 
 * @param text - Accumulated streaming text that may contain Vega spec
 * @returns Parsed Vega spec object or null if not found/invalid
 */
export function extractVegaSpec(text: string): Record<string, unknown> | null {
  if (!text || typeof text !== 'string') {
    return null
  }

  // Try to find JSON in markdown code blocks (```json ... ```)
  const jsonBlockRegex = /```json\s*([\s\S]*?)```/i
  const match = text.match(jsonBlockRegex)

  let jsonText: string | null = null

  if (match && match[1]) {
    // Found JSON in code block
    jsonText = match[1].trim()
  } else {
    // Try to find JSON object directly (may be incomplete during streaming)
    // Look for opening brace followed by potential JSON content
    const jsonStartRegex = /\{[\s\S]*/
    const jsonMatch = text.match(jsonStartRegex)
    if (jsonMatch) {
      jsonText = jsonMatch[0]
    }
  }

  if (!jsonText) {
    return null
  }

  // Try to parse JSON
  // During streaming, JSON may be incomplete, so we try to parse what we have
  try {
    const parsed = JSON.parse(jsonText)
    return parsed as Record<string, unknown>
  } catch (error) {
    // JSON may be incomplete during streaming, return null instead of throwing
    return null
  }
}

