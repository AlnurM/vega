import type { StreamEvent } from '../types/stream'

/**
 * Reads and parses a .jsonl file line by line
 * Each line is a JSON object representing a StreamEvent
 * 
 * @param file - File object from HTML5 FileReader API
 * @returns Promise that resolves to array of StreamEvent objects
 */
export async function parseJsonlFile(file: File): Promise<StreamEvent[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string
        if (!text) {
          resolve([])
          return
        }

        const lines = text.split('\n')
        const events: StreamEvent[] = []

        for (const line of lines) {
          // Handle empty lines gracefully
          const trimmedLine = line.trim()
          if (trimmedLine === '') {
            continue
          }

          try {
            const event = JSON.parse(trimmedLine) as StreamEvent
            events.push(event)
          } catch (parseError) {
            // Skip invalid JSON lines, don't crash
            console.warn('Failed to parse line:', trimmedLine, parseError)
            continue
          }
        }

        resolve(events)
      } catch (error) {
        reject(new Error(`Failed to parse .jsonl file: ${error}`))
      }
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }

    reader.readAsText(file)
  })
}

